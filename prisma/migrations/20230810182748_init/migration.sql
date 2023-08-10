-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "login" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" UUID,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" UUID,
    "albumId" UUID,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavArtist" (
    "artistId" UUID NOT NULL,

    CONSTRAINT "FavArtist_pkey" PRIMARY KEY ("artistId")
);

-- CreateTable
CREATE TABLE "FavsAlbum" (
    "albumId" UUID NOT NULL,

    CONSTRAINT "FavsAlbum_pkey" PRIMARY KEY ("albumId")
);

-- CreateTable
CREATE TABLE "FavTrack" (
    "trackId" UUID NOT NULL,

    CONSTRAINT "FavTrack_pkey" PRIMARY KEY ("trackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavArtist_artistId_key" ON "FavArtist"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "FavsAlbum_albumId_key" ON "FavsAlbum"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavTrack_trackId_key" ON "FavTrack"("trackId");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
