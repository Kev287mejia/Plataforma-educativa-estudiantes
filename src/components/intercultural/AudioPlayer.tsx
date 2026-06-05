"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from "lucide-react";

interface AudioPlayerProps {
  title: string;
  artist: string;
  duration: string;
  src?: string;
}

export function AudioPlayer({ title, artist, duration, src }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Mock progress

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center group hover:shadow-md transition-shadow">
      {/* Vinyl/Record visual */}
      <div className="relative w-32 h-32 mb-6">
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center shadow-lg relative overflow-hidden"
        >
          {/* Vinyl grooves */}
          <div className="absolute inset-2 rounded-full border border-slate-700/50" />
          <div className="absolute inset-4 rounded-full border border-slate-700/50" />
          <div className="absolute inset-6 rounded-full border border-slate-700/50" />
          
          {/* Label */}
          <div className="w-12 h-12 rounded-full bg-amber-500 border-4 border-slate-800 flex items-center justify-center relative">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
        
        {/* Floating notes when playing */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], y: -30, scale: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 -right-4 text-amber-500"
          >
            <Music className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      <div className="text-center mb-6 w-full">
        <h3 className="font-bold text-slate-900 text-lg mb-1">{title}</h3>
        <p className="text-sm text-slate-500">{artist}</p>
      </div>

      {/* Scrubber */}
      <div className="w-full space-y-2 mb-6">
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden cursor-pointer">
          <div 
            className="h-full bg-amber-500 rounded-full relative"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 font-medium">
          <span>0:45</span>
          <span>{duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-slate-700 transition-colors">
          <SkipBack className="w-6 h-6 fill-current" />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-14 h-14 bg-amber-500 text-white rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors shadow-md shadow-amber-500/30 hover:scale-105 transform"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-1" />
          )}
        </button>
        
        <button className="text-slate-400 hover:text-slate-700 transition-colors">
          <SkipForward className="w-6 h-6 fill-current" />
        </button>
      </div>
    </div>
  );
}
