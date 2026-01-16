import { useEffect, useRef, useCallback } from 'react';

interface AmbientAudioOptions {
  fadeInDuration?: number;
  fadeOutDuration?: number;
  volume?: number;
}

export const useAmbientAudio = (options: AmbientAudioOptions = {}) => {
  const { fadeInDuration = 3000, fadeOutDuration = 2000, volume = 0.15 } = options;
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const isPlayingRef = useRef(false);

  const createWindNoise = (ctx: AudioContext, masterGain: GainNode) => {
    // Create brown noise for wind base
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Boost
    }

    const windSource = ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    // Filter for wind character
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 400;
    windFilter.Q.value = 1;

    // LFO for wind modulation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 150;
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    lfo.start();

    const windGain = ctx.createGain();
    windGain.gain.value = 0.6;

    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);
    windSource.start();

    return [windSource, windFilter, lfo, lfoGain, windGain];
  };

  const createMysticalTones = (ctx: AudioContext, masterGain: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Ethereal drone frequencies
    const frequencies = [55, 82.5, 110, 165]; // A1, E2, A2, E3
    
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      // Slight detune for richness
      const detunedOsc = ctx.createOscillator();
      detunedOsc.type = 'sine';
      detunedOsc.frequency.value = freq * 1.003;

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.03 / (i + 1);

      // Slow tremolo
      const tremolo = ctx.createOscillator();
      const tremoloGain = ctx.createGain();
      tremolo.frequency.value = 0.05 + (i * 0.02);
      tremoloGain.gain.value = 0.01;
      
      tremolo.connect(tremoloGain);
      tremoloGain.connect(oscGain.gain);

      osc.connect(oscGain);
      detunedOsc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start();
      detunedOsc.start();
      tremolo.start();

      nodes.push(osc, detunedOsc, tremolo, tremoloGain, oscGain);
    });

    return nodes;
  };

  const createDesertAmbience = (ctx: AudioContext, masterGain: GainNode) => {
    // High-frequency shimmer (heat haze effect)
    const shimmerOsc = ctx.createOscillator();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.value = 2000;

    const shimmerFilter = ctx.createBiquadFilter();
    shimmerFilter.type = 'bandpass';
    shimmerFilter.frequency.value = 2500;
    shimmerFilter.Q.value = 5;

    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.005;

    // Random amplitude modulation
    const shimmerLfo = ctx.createOscillator();
    const shimmerLfoGain = ctx.createGain();
    shimmerLfo.frequency.value = 0.3;
    shimmerLfoGain.gain.value = 0.003;
    shimmerLfo.connect(shimmerLfoGain);
    shimmerLfoGain.connect(shimmerGain.gain);

    shimmerOsc.connect(shimmerFilter);
    shimmerFilter.connect(shimmerGain);
    shimmerGain.connect(masterGain);
    
    shimmerOsc.start();
    shimmerLfo.start();

    return [shimmerOsc, shimmerFilter, shimmerGain, shimmerLfo, shimmerLfoGain];
  };

  const start = useCallback(() => {
    if (isPlayingRef.current) return;
    
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Create all audio layers
      const windNodes = createWindNoise(ctx, masterGain);
      const toneNodes = createMysticalTones(ctx, masterGain);
      const desertNodes = createDesertAmbience(ctx, masterGain);
      
      nodesRef.current = [...windNodes, ...toneNodes, ...desertNodes];

      // Fade in
      masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + fadeInDuration / 1000);
      
      isPlayingRef.current = true;
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }, [fadeInDuration, volume]);

  const stop = useCallback(() => {
    if (!isPlayingRef.current || !audioContextRef.current || !masterGainRef.current) return;

    const ctx = audioContextRef.current;
    const masterGain = masterGainRef.current;

    // Fade out
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeOutDuration / 1000);

    // Cleanup after fade
    setTimeout(() => {
      nodesRef.current.forEach(node => {
        try {
          if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
            node.stop();
          }
          node.disconnect();
        } catch (e) {
          // Node already stopped
        }
      });
      
      ctx.close();
      audioContextRef.current = null;
      masterGainRef.current = null;
      nodesRef.current = [];
      isPlayingRef.current = false;
    }, fadeOutDuration + 100);
  }, [fadeOutDuration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isPlayingRef.current) {
        stop();
      }
    };
  }, [stop]);

  return { start, stop, isPlaying: isPlayingRef.current };
};
