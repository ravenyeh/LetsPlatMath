import { PokemonCard, Rarity, RARITY_CONFIG } from './types';

// Popular Pokémon with Chinese names, organized by rarity
const POKEMON_POOL: Record<Rarity, { id: number; name: string; nameZh: string; type: string }[]> = {
  N: [
    { id: 1, name: 'Bulbasaur', nameZh: '妙蛙種子', type: '草' },
    { id: 4, name: 'Charmander', nameZh: '小火龍', type: '火' },
    { id: 7, name: 'Squirtle', nameZh: '傑尼龜', type: '水' },
    { id: 10, name: 'Caterpie', nameZh: '綠毛蟲', type: '蟲' },
    { id: 16, name: 'Pidgey', nameZh: '波波', type: '飛行' },
    { id: 19, name: 'Rattata', nameZh: '小拉達', type: '一般' },
    { id: 25, name: 'Pikachu', nameZh: '皮卡丘', type: '電' },
    { id: 35, name: 'Clefairy', nameZh: '皮皮', type: '妖精' },
    { id: 39, name: 'Jigglypuff', nameZh: '胖丁', type: '妖精' },
    { id: 52, name: 'Meowth', nameZh: '喵喵', type: '一般' },
    { id: 54, name: 'Psyduck', nameZh: '可達鴨', type: '水' },
    { id: 133, name: 'Eevee', nameZh: '伊布', type: '一般' },
    { id: 152, name: 'Chikorita', nameZh: '菊草葉', type: '草' },
    { id: 155, name: 'Cyndaquil', nameZh: '火球鼠', type: '火' },
    { id: 158, name: 'Totodile', nameZh: '小鋸鱷', type: '水' },
    { id: 172, name: 'Pichu', nameZh: '皮丘', type: '電' },
    { id: 175, name: 'Togepi', nameZh: '波克比', type: '妖精' },
    { id: 255, name: 'Torchic', nameZh: '火稚雞', type: '火' },
    { id: 258, name: 'Mudkip', nameZh: '水躍魚', type: '水' },
    { id: 393, name: 'Piplup', nameZh: '波加曼', type: '水' },
  ],
  R: [
    { id: 2, name: 'Ivysaur', nameZh: '妙蛙草', type: '草' },
    { id: 5, name: 'Charmeleon', nameZh: '火恐龍', type: '火' },
    { id: 8, name: 'Wartortle', nameZh: '卡咪龜', type: '水' },
    { id: 26, name: 'Raichu', nameZh: '雷丘', type: '電' },
    { id: 59, name: 'Arcanine', nameZh: '風速狗', type: '火' },
    { id: 65, name: 'Alakazam', nameZh: '胡地', type: '超能力' },
    { id: 94, name: 'Gengar', nameZh: '耿鬼', type: '幽靈' },
    { id: 130, name: 'Gyarados', nameZh: '暴鯉龍', type: '水' },
    { id: 131, name: 'Lapras', nameZh: '拉普拉斯', type: '水' },
    { id: 134, name: 'Vaporeon', nameZh: '水伊布', type: '水' },
    { id: 136, name: 'Flareon', nameZh: '火伊布', type: '火' },
    { id: 143, name: 'Snorlax', nameZh: '卡比獸', type: '一般' },
    { id: 448, name: 'Lucario', nameZh: '路卡利歐', type: '格鬥' },
    { id: 445, name: 'Garchomp', nameZh: '烈咬陸鯊', type: '龍' },
  ],
  SR: [
    { id: 3, name: 'Venusaur', nameZh: '妙蛙花', type: '草' },
    { id: 6, name: 'Charizard', nameZh: '噴火龍', type: '火' },
    { id: 9, name: 'Blastoise', nameZh: '水箭龜', type: '水' },
    { id: 149, name: 'Dragonite', nameZh: '快龍', type: '龍' },
    { id: 248, name: 'Tyranitar', nameZh: '班基拉斯', type: '岩石' },
    { id: 373, name: 'Salamence', nameZh: '暴飛龍', type: '龍' },
    { id: 376, name: 'Metagross', nameZh: '巨金怪', type: '鋼' },
    { id: 635, name: 'Hydreigon', nameZh: '三首惡龍', type: '龍' },
  ],
  SSR: [
    { id: 150, name: 'Mewtwo', nameZh: '超夢', type: '超能力' },
    { id: 151, name: 'Mew', nameZh: '夢幻', type: '超能力' },
    { id: 249, name: 'Lugia', nameZh: '洛奇亞', type: '超能力' },
    { id: 250, name: 'Ho-Oh', nameZh: '鳳王', type: '火' },
    { id: 384, name: 'Rayquaza', nameZh: '烈空坐', type: '龍' },
    { id: 483, name: 'Dialga', nameZh: '帝牙盧卡', type: '鋼' },
    { id: 484, name: 'Palkia', nameZh: '帕路奇亞', type: '水' },
  ],
};

function rollRarity(guaranteeR: boolean = false): Rarity {
  const rand = Math.random();
  if (rand < RARITY_CONFIG.SSR.chance) return 'SSR';
  if (rand < RARITY_CONFIG.SSR.chance + RARITY_CONFIG.SR.chance) return 'SR';
  if (rand < RARITY_CONFIG.SSR.chance + RARITY_CONFIG.SR.chance + RARITY_CONFIG.R.chance) return 'R';
  return guaranteeR ? 'R' : 'N';
}

export function drawCard(guaranteeR: boolean = false): PokemonCard {
  const rarity = rollRarity(guaranteeR);
  const pool = POKEMON_POOL[rarity];
  const pokemon = pool[Math.floor(Math.random() * pool.length)];

  return {
    id: pokemon.id,
    name: pokemon.name,
    nameZh: pokemon.nameZh,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    rarity,
    type: pokemon.type,
  };
}

export function drawCards(correctCount: number, total: number): PokemonCard[] {
  if (correctCount < 7) return [];

  let cardCount: number;
  if (correctCount === total) {
    cardCount = 3;
  } else if (correctCount >= 9) {
    cardCount = 2;
  } else {
    cardCount = 1;
  }

  const cards: PokemonCard[] = [];
  for (let i = 0; i < cardCount; i++) {
    // Last card of a perfect score gets guaranteed R+
    const guaranteeR = correctCount === total && i === cardCount - 1;
    cards.push(drawCard(guaranteeR));
  }

  return cards;
}

export function getCardsEarnedCount(correctCount: number, total: number): number {
  if (correctCount < 7) return 0;
  if (correctCount === total) return 3;
  if (correctCount >= 9) return 2;
  return 1;
}
