import { loadEnv, defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { urbitPlugin } from '@urbit/vite-plugin-urbit';

// https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  const SHIP_URL = process.env.SHIP_URL || process.env.VITE_SHIP_URL || 'http://localhost:8080';
  const VITE_PORT = Number(process.env.VITE_PORT || '3000');

  return defineConfig({
    server: { port: VITE_PORT },
    plugins: [urbitPlugin({ base: 'whom', target: SHIP_URL, secure: false }), reactRefresh()]
  });
};
