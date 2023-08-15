import { AxiosService } from './axiosService';

class GameService extends AxiosService {
  public constructor() {
    super();
  }

  async getGames() {
    try {
      const { data } = await this.axios.post<Game[]>('/games', {
        data: 'fields *; limit 10;',
      });
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export interface Game {
  id: number;
  category?: number;
  created_at?: number;
  external_games?: number[];
  first_release_date?: number;
  game_modes?: number[];
  genres?: number[];
  name?: string;
  platforms?: number[];
  player_perspectives?: number[];
  rating?: number;
  rating_count?: number;
  release_dates?: number[];
  screenshots?: number[];
  similar_games?: number[];
  slug?: string;
  summary?: string;
  tags?: number[];
  themes?: number[];
  total_rating?: number;
  total_rating_count?: number;
  updated_at?: number;
  url?: string;
  videos?: number[];
  websites?: number[];
  checksum?: string;
  language_supports?: number[];
}

export const gameService = new GameService();

const tempData = [
  {
    id: 35642,
    category: 0,
    created_at: 1495873637,
    external_games: [9112, 1985455, 2601347],
    first_release_date: 1433116800,
    game_modes: [1],
    genres: [12, 15, 16, 24, 32],
    name: 'Dungeon Crawlers HD',
    platforms: [3, 6, 14],
    player_perspectives: [7],
    rating: 50.0,
    rating_count: 0,
    release_dates: [81812, 81813, 81814],
    screenshots: [87286, 87287, 87288, 87289, 87290],
    similar_games: [7615, 9472, 13196, 19404, 26268, 28182, 36258, 93694, 109339, 113402],
    slug: 'dungeon-crawlers-hd',
    summary:
      'Dungeon Crawlers is a game designed to explore the fun and funny concept of what "Ghostbusters" might\u0027ve looked like if it were set in a dungeon.  It\u0027s a turn-based strategy game that is easily accessible.  Don\u0027t expect to dive too deep into statistics and weapons types here.  The interface is highly streamlined.  This game is all about launching and playing, but still being demanding and challenging to even the most seasoned of turn-based vets.',
    tags: [27, 268435468, 268435471, 268435472, 268435480, 268435488],
    themes: [27],
    total_rating: 50.0,
    total_rating_count: 0,
    updated_at: 1690327029,
    url: 'https://www.igdb.com/games/dungeon-crawlers-hd',
    videos: [75496],
    websites: [37703, 37704, 313598, 441418],
    checksum: 'e14f6a84-25da-3c88-7261-fd4b88217f7c',
    language_supports: [76103, 76104, 76105],
  },
  {
    id: 246925,
    artworks: [106548],
    category: 0,
    cover: 315867,
    created_at: 1682389596,
    external_games: [2695892, 2696193],
    first_release_date: 1682640000,
    game_modes: [1],
    genres: [31, 32],
    name: 'Stickman and the Sword of Legends',
    platforms: [6],
    release_dates: [472368, 494226],
    screenshots: [1037461, 1037463, 1037466, 1037470, 1037473],
    similar_games: [25646, 28309, 29783, 30245, 68271, 96217, 106987, 111130, 113360, 113895],
    slug: 'stickman-and-the-sword-of-legends',
    status: 4,
    summary:
      'Stickman needs to get the Sword of Legends to be able to leave his planet that is about to explode.',
    tags: [1, 268435487, 268435488],
    themes: [1],
    updated_at: 1689797564,
    url: 'https://www.igdb.com/games/stickman-and-the-sword-of-legends',
    websites: [546814],
    checksum: '9370836b-a579-a67b-2899-e0e45a94b6fa',
    language_supports: [678670, 678671, 678672],
  },
  {
    id: 245087,
    bundles: [5340],
    category: 0,
    created_at: 1681133385,
    external_games: [2692242],
    first_release_date: 683683200,
    game_modes: [1],
    genres: [8],
    involved_companies: [214597],
    name: 'Cry Baby',
    platforms: [18],
    player_perspectives: [3],
    release_dates: [466295],
    similar_games: [24426, 28070, 29032, 55199, 56967, 81551, 96217, 106987, 113636, 120184],
    slug: 'cry-baby--1',
    summary:
      'Try to get cry baby back to his crip, but be careful to avoid open electric sockets, poisons, fire in the stove. There are things to help along the way such as cookies, lollipops, candy bars and pacifies. If the baby meets any bad guys trying to kidnap him he squeezes the bottle and shoots them.',
    tags: [1, 17, 268435464],
    themes: [1, 17],
    updated_at: 1688649571,
    url: 'https://www.igdb.com/games/cry-baby--1',
    websites: [544049],
    checksum: '8e1e035d-f516-34c7-7ac0-483ca20a9a68',
  },
  {
    id: 85450,
    age_ratings: [67799],
    category: 0,
    created_at: 1517405808,
    external_games: [221231, 1748471, 1991656],
    involved_companies: [85230],
    name: 'Transformers Prime: The Game',
    slug: 'transformers-prime-the-game',
    updated_at: 1670993154,
    url: 'https://www.igdb.com/games/transformers-prime-the-game',
    checksum: '489ad4d0-e2f2-09e0-3bae-a76091559c44',
  },
  {
    id: 95080,
    category: 0,
    created_at: 1521818623,
    external_games: [1989881],
    name: 'Dotra',
    slug: 'dotra',
    updated_at: 1670992528,
    url: 'https://www.igdb.com/games/dotra',
    websites: [445624],
    checksum: 'bc043ffb-ad60-6bd0-801b-55a6141e773c',
  },
  {
    id: 104748,
    category: 0,
    created_at: 1530519587,
    external_games: [1155919, 1972586],
    name: 'Space station - build your own ISS',
    slug: 'space-station-build-your-own-iss',
    updated_at: 1670986137,
    url: 'https://www.igdb.com/games/space-station-build-your-own-iss',
    websites: [429116],
    checksum: '69cba8e8-24a8-db9c-1970-12e455d00ff9',
  },
  {
    id: 89616,
    category: 0,
    cover: 192106,
    created_at: 1519986874,
    external_games: [269608, 1949905],
    game_modes: [1],
    genres: [9, 33],
    hypes: 1,
    involved_companies: [154613],
    name: 'Bubble Whirl Shooter',
    platforms: [34, 39],
    similar_games: [18115, 19222, 25905, 41349, 85804, 87170, 87507, 90788, 90965, 95776],
    slug: 'bubble-whirl-shooter',
    status: 8,
    summary:
      'Shoot bubbles and match colors to pop your way up to victory in this bubble shooting adventure, win magic keys to unlock more secret colorful bubble world, it’s time to enjoy the endless bubble shooting fun!',
    tags: [268435465, 268435489],
    updated_at: 1678800343,
    url: 'https://www.igdb.com/games/bubble-whirl-shooter',
    websites: [407422],
    checksum: '970708ae-528c-7915-8f18-8786a4120376',
  },
  {
    id: 91579,
    category: 0,
    created_at: 1521138594,
    external_games: [128240, 1189096],
    name: 'Racing Live',
    slug: 'racing-live',
    updated_at: 1670942773,
    url: 'https://www.igdb.com/games/racing-live',
    websites: [346516],
    checksum: '3bf799f5-07cd-c4af-a786-f50dbc8d9cdf',
  },
  {
    id: 5340,
    age_ratings: [87809],
    alternative_names: [3670],
    category: 3,
    collection: 6718,
    cover: 210515,
    created_at: 1392154435,
    external_games: [30397, 143967],
    first_release_date: 683683200,
    game_modes: [1, 2],
    genres: [5, 8, 10, 31, 33],
    involved_companies: [204122],
    keywords: [
      6, 164, 274, 328, 558, 947, 960, 1395, 1478, 1821, 4328, 4329, 4472, 4500, 4990, 5441, 5806,
      12970, 26906,
    ],
    multiplayer_modes: [22872],
    name: 'Action 52',
    platforms: [18],
    player_perspectives: [3, 4],
    release_dates: [465760],
    screenshots: [1083777, 1083778, 1083779, 1083787],
    similar_games: [1877, 24426, 25901, 55038, 55190, 56033, 103292, 105049, 105269, 110503],
    slug: 'action-52',
    summary:
      'Get 52 "New and Original" exciting games for play on your Nintendo System. Try to get Billy Bob out of the Dungeon where he is imprisoned, to save MARYLOU. Go along with the ACTION GAMEMASTER as he changes into one of the fearsome CHEETAHMEN to try to defeat all of the ACTION 52 evil attackers. These two games plus an additional 50 games on this one "Multi-GamePak" will keep you entertained for a long time.',
    tags: [
      1, 268435461, 268435464, 268435466, 268435487, 268435489, 536870918, 536871076, 536871186,
      536871240, 536871470, 536871859, 536871872, 536872307, 536872390, 536872733, 536875240,
      536875241, 536875384, 536875412, 536875902, 536876353, 536876718, 536883882, 536897818,
    ],
    themes: [1],
    updated_at: 1688649570,
    url: 'https://www.igdb.com/games/action-52',
    videos: [87460],
    websites: [94873, 335180, 542222],
    checksum: '18975175-70eb-82ea-ac38-19226d22e4a1',
    ports: [245623],
    language_supports: [674097],
  },
  {
    id: 124961,
    category: 0,
    created_at: 1571616000,
    name: 'Railroad Tycoon 2: Platinum Edition',
    slug: 'railroad-tycoon-2-platinum-edition',
    updated_at: 1571616000,
    url: 'https://www.igdb.com/games/railroad-tycoon-2-platinum-edition',
    version_parent: 24115,
    version_title: 'Platinum Edition',
    websites: [121131],
    checksum: 'c405b7c1-7d15-9e53-c0eb-c3ad3f4af32a',
  },
];
