declare module 'react-gtm-module' {
  interface TagManagerArgs {
    gtmId: string;
    dataLayerName?: string;
    auth?: string;
    preview?: string;
    events?: Record<string, unknown>;
  }

  const TagManager: {
    initialize: (args: TagManagerArgs) => void;
    dataLayer?: (args: { dataLayer: Record<string, unknown>; dataLayerName?: string }) => void;
  };

  export default TagManager;
}


