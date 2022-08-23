import Urbit from '@urbit/http-api';
import { GallApp, GallUpdate } from '../types/GallTypes';

const Subscribe = (handleUpdate: (update: GallUpdate) => any): Urbit => {
  let api = new Urbit('', '', '');
  api.ship = window.ship;

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
  return api;
};

export { Subscribe };
