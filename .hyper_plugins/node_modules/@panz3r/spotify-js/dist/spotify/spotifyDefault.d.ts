import { SpotifyAction, SpotifyService, SpotifyState, SpotifyTrack } from '../index';
declare class SpotifyDefault implements SpotifyService {
    supportedActions: SpotifyAction[];
    constructor();
    isRunning(): Promise<boolean>;
    getState(): Promise<SpotifyState>;
    getTrack(): Promise<SpotifyTrack>;
    togglePlayPause(): Promise<SpotifyState>;
    previousTrack(): Promise<SpotifyTrack>;
    nextTrack(): Promise<SpotifyTrack>;
}
export default SpotifyDefault;
