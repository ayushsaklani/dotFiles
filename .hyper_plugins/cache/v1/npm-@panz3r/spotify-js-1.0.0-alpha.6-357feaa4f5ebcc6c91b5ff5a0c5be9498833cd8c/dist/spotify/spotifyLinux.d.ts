import { SpotifyAction, SpotifyService, SpotifyState, SpotifyTrack } from '../index';
declare class SpotifyLinux implements SpotifyService {
    private _player?;
    private _properties?;
    supportedActions: SpotifyAction[];
    constructor();
    isRunning(): Promise<boolean>;
    getState(): Promise<SpotifyState>;
    getTrack(): Promise<SpotifyTrack>;
    togglePlayPause(): Promise<SpotifyState>;
    previousTrack(): Promise<SpotifyTrack>;
    nextTrack(): Promise<SpotifyTrack>;
    private _getInterfaces;
}
export default SpotifyLinux;
