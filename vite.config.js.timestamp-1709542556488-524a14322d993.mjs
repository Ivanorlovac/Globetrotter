// vite.config.js
import { defineConfig } from "file:///C:/Users/kvist/Skola/React/Globetrotter/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/kvist/Skola/React/Globetrotter/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // localhost:5173/api -> localhost:3000/,
      // t.ex. localhost:5173/api/products -> localhost:3000/products
      "/api": {
        // url som vi vill skicka till, från vår react app
        target: "http://localhost:3000",
        changeOrigin: true,
        // tar bort /api/ från vår path
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrdmlzdFxcXFxTa29sYVxcXFxSZWFjdFxcXFxHbG9iZXRyb3R0ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGt2aXN0XFxcXFNrb2xhXFxcXFJlYWN0XFxcXEdsb2JldHJvdHRlclxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMva3Zpc3QvU2tvbGEvUmVhY3QvR2xvYmV0cm90dGVyL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwcm94eToge1xyXG4gICAgICAvLyBsb2NhbGhvc3Q6NTE3My9hcGkgLT4gbG9jYWxob3N0OjMwMDAvLFxyXG4gICAgICAvLyB0LmV4LiBsb2NhbGhvc3Q6NTE3My9hcGkvcHJvZHVjdHMgLT4gbG9jYWxob3N0OjMwMDAvcHJvZHVjdHNcclxuICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgLy8gdXJsIHNvbSB2aSB2aWxsIHNraWNrYSB0aWxsLCBmclx1MDBFNW4gdlx1MDBFNXIgcmVhY3QgYXBwXHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgLy8gdGFyIGJvcnQgL2FwaS8gZnJcdTAwRTVuIHZcdTAwRTVyIHBhdGhcclxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsU0FBUyxvQkFBb0I7QUFDaFYsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUE7QUFBQTtBQUFBLE1BR0wsUUFBUTtBQUFBO0FBQUEsUUFFTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUE7QUFBQSxRQUVkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
