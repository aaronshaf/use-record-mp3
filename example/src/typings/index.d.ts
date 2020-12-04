declare module "react-use-user-media" {
  export default function useUserMedia(config: any): any;
}

declare module "react-github-fork-ribbon" {
  export default function Component(props: any): any;
}

declare global {
  interface Window {
    webkitAudioContext: any;
  }
}
