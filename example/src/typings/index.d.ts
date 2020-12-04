declare module 'react-use-user-media' {
  export default function useUserMedia(config: any): any
}

declare global {
  interface Window {
    webkitAudioContext: any
  }
}
