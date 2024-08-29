FROM node:20

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app
# RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
# Install dependencies using pnpm
RUN pnpm install
RUN npx prisma generate

COPY . .

EXPOSE 5050

# CMD [ "pnpm", "start:dev" ]