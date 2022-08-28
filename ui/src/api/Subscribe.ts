import Urbit from '@urbit/http-api';
import { GallApp, GallUpdate } from '../types/GallTypes';

const Subscribe = (api: Urbit, handleUpdate: (update: GallUpdate) => any) => {
  let subscribe = (app: GallApp, path: string) => {
    api.subscribe({
      app: app,
      path: path,
      event: (data) => handleUpdate({ app, data }),
      quit: (qui) => console.error(qui),
      err: (err) => console.error(err)
    });
  };
  subscribe('whom', '/updates');
};

export { Subscribe };
