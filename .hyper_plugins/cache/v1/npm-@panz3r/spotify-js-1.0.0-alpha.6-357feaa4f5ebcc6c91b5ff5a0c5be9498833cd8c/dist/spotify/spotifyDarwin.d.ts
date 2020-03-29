import { SpotifyAction, SpotifyService, SpotifyState, SpotifyTrack } from '../index';
declare class SpotifyDarwin implements SpotifyService {
    supportedActions: SpotifyAction[];
    isRunning(): Promise<boolean>;
    getState(): Promise<SpotifyState>;
    getTrack(): Promise<SpotifyTrack>;
    togglePlayPause(): Promise<SpotifyState>;
    previousTrack(): Promise<SpotifyTrack>;
    nextTrack(): Promise<SpotifyTrack>;
}
export default SpotifyDarwin;
