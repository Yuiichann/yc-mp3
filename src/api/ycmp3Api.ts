import { ArtistParams, HomeParams, IDParams, SearchParams } from '../types';
import axiosClient from './axiosClient';
import type { AxiosRequestConfig } from 'axios';

const ycMp3 = {
  // get file mp3 of a song
  getSong: (params: IDParams) => {
    const url = 'song';
    return axiosClient.get(url, { params } as AxiosRequestConfig);
  },
  // get Detail of Playlist music
  getDetailPlaylist: (params: IDParams) => {
    const url = 'detailplaylist';
    return axiosClient.get(url, { params } as AxiosRequestConfig);
  },
  // get home page of zing mp3
  getHome: (params: HomeParams) => {
    const url = 'home';
    return axiosClient.get(url, { params } as AxiosRequestConfig);
  },
  // get top 100 song
  getTop100: () => {
    const url = 'top100';
    return axiosClient.get(url);
  },
  // get chart home
  getCharthome: () => {
    const url = 'charthome';
    return axiosClient.get(url);
  },
  getNewReleaseChart: () => {
    const url = 'newreleasechart';
    return axiosClient.get(url);
  },
  // get Info of a song
  getInfoSong: (params: IDParams) => {
    const url = 'infosong';
    return axiosClient.get(url, { params } as AxiosRequestConfig);
  },
  getArtist: (params: ArtistParams) => {
    const url = 'artist';
    return axiosClient.get(url, { params } as AxiosRequestConfig);
  },
  getArtistSong: (params: ArtistParams) => {
    const url = 'artistsong';
    return axiosClient.get(url, { params } as AxiosRequestConfig);
  },
  getLyric: (params: IDParams) => {
    const url = 'lyric';
    return axiosClient.get(url, { params } as AxiosRequestConfig);
  },
  // Search by keyword
  getSearch: (params: SearchParams) => {
    const url = 'search';
    return axiosClient.get(url, { params } as AxiosRequestConfig);
  },
  // getVideo
  getVideo: (params: IDParams) => {
    const url = 'video';
    return axiosClient.get(url, { params } as AxiosRequestConfig);
  },
  getYcAlbum: () => {
    const url = 'album-yc';
    return axiosClient.get(url);
  },
  getOneSongInYcAlbum: (params: IDParams) => {
    const url = 'album-yc/song';
    return axiosClient.get(url, { params } as AxiosRequestConfig);
  },
};

export default ycMp3;
