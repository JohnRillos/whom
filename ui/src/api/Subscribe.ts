import Urbit from '@urbit/http-api';
import { GallApp, GallUpdate, SubscribePath } from '../types/GallTypes';

const Subscribe = (api: Urbit, handleUpdate: (update: GallUpdate) => unknown) => {
  const subscribe = (app: GallApp, path: SubscribePath) => {
    api.subscribe({
      app: app,
      path: path,
      event: (data) => handleUpdate({ app, path, data } as GallUpdate),
      quit: (qui) => console.error(qui),
      err: (err) => console.error(err)
    });
  };
  subscribe('whom', SubscribePath.Contacts);
  subscribe('whom', SubscribePath.Fields);
  subscribe('whom', SubscribePath.Self);
  subscribe('whom', SubscribePath.ImportPals);
  subscribe('whom', SubscribePath.Pals);

  subscribe('contact-store', SubscribePath.ContactStore);
};

export { Subscribe };
