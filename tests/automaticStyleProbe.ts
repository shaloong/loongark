export interface AutomaticStyleProbe {
  ready: boolean;
  loadDialog(): Promise<void>;
  changeTheme(): void;
  removeFirst(): void;
  removeAll(): void;
  loadAfterUnmount(): Promise<void>;
}
declare global {
  interface Window {
    loongarkAutomaticStyles?: AutomaticStyleProbe;
  }
}
