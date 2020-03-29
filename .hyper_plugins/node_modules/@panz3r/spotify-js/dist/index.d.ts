/// <reference types="node" />
export declare type SpotifyAction = 'togglePlayPause' | 'previousTrack' | 'nextTrack';
export declare type SpotifyPlaybackState = 'playing' | 'paused' | 'stopped';
export interface SpotifyState {
    state: SpotifyPlaybackState;
}
export interface SpotifyTrack {
    name: string;
    [key: string]: any;
}
export interface SpotifyService {
    supportedActions: SpotifyAction[];
    isRunning(): Promise<boolean>;
    getState(): Promise<SpotifyState>;
    getTrack(): Promise<SpotifyTrack>;
    togglePlayPause(): Promise<SpotifyState>;
    previousTrack(): Promise<SpotifyTrack>;
    nextTrack(): Promise<SpotifyTrack>;
}
export declare class SpotifyManager {
    private spotifySrv;
    constructor();
    launchSpotify(): Promise<import("child_process").ChildProcess>;
    supportedActions(): SpotifyAction[];
    isRunning(): Promise<boolean>;
    getState(): Promise<SpotifyState>;
    togglePlayPause(): Promise<SpotifyState>;
    previousTrack(): Promise<SpotifyTrack>;
    nextTrack(): Promise<SpotifyTrack>;
    getTrack(): Promise<SpotifyTrack>;
}
