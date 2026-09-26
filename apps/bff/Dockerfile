# Build from the repo root: docker build -f apps/bff/Dockerfile .
FROM node:22.22-bookworm-slim AS build
WORKDIR /repo
# .npmrc sets legacy-peer-deps. Without it, npm ci rejects the lockfile.
COPY package.json package-lock.json .npmrc ./
COPY apps ./apps
COPY packages ./packages
RUN npm ci --ignore-scripts
RUN npm run build --workspace=bff

FROM node:22.22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY apps/bff/package.json ./package.json
RUN npm install --omit=dev --ignore-scripts && npm cache clean --force
COPY --from=build /repo/apps/bff/dist ./dist
USER node
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||process.env.BFF_PORT||4000)+'/health').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/main.js"]
