import Urbit from '@urbit/http-api';
import { GallApp, GallUpdate, SubscribePath } from '../types/GallTypes';

const Subscribe = (api: Urbit, handleUpdate: (update: GallUpdate) => any) => {
  let subscribe = (app: GallApp, path: SubscribePath) => {
    api.subscribe({
      app: app,
      path: path,
      event: (data) => handleUpdate({ app, path, data }),
      quit: (qui) => console.error(qui),
      err: (err) => console.error(err)
    });
  };
  subscribe('whom', '/contacts');
  subscribe('whom', '/fields');
  subscribe('whom', '/self');
};

export { Subscribe };
