export const Terraria = {
    Player: new NativeClass('Terraria', 'Player'),
    Item: new NativeClass('Terraria', 'Item'),
    Projectile: new NativeClass('Terraria', 'Projectile'),
    NPC: new NativeClass('Terraria', 'NPC'),
    Main: new NativeClass('Terraria', 'Main'),
    WorldGen: new NativeClass('Terraria', 'WorldGen'),
    Lang: new NativeClass('Terraria', 'Lang'),
    Recipe: new NativeClass('Terraria', 'Recipe'),
    Tile: new NativeClass('Terraria', 'Tile'),
    TileData: new NativeClass('Terraria', 'TileData'),
    TileObject: new NativeClass('Terraria', 'TileObject'),
    Utils: new NativeClass('Terraria', 'Utils'),
    Mount : new NativeClass('Terraria', 'Mount'),
    GetItemSettings: new NativeClass('Terraria', 'GetItemSettings'),
    Chest: new NativeClass('Terraria', 'Chest'),
    Dust: new NativeClass('Terraria', 'Dust'),
    CombatText: new NativeClass('Terraria', 'CombatText'),
    Collision: new NativeClass('Terraria', 'Collision'),
    GUIPlayerCreateMenu: new NativeClass('', 'GUIPlayerCreateMenu'),
    PlayerSpawnContext: new NativeClass('Terraria', 'PlayerSpawnContext'),
    DelegateMethods: new NativeClass('Terraria', 'DelegateMethods'),
    PopupText: new NativeClass('Terraria', 'PopupText'),
    ID: {
        NPCID: new NativeClass('Terraria.ID', 'NPCID'),
        SoundID: new NativeClass('Terraria.ID', 'SoundID'),
        ItemID: new NativeClass('Terraria.ID', 'ItemID'),
        TileID: new NativeClass('Terraria.ID', 'TileID'),
        ArmorIDs: new NativeClass('Terraria.ID', 'ArmorIDs'),
        ProjectileID: new NativeClass('Terraria.ID', 'ProjectileID'),
        ContentSamples: new NativeClass('Terraria.ID', 'ContentSamples'),
        AmmoID: new NativeClass('Terraria.ID', 'AmmoID'),
        MountID: new NativeClass('Terraria.ID', 'MountID'),
        ItemUseStyleID: new NativeClass('Terraria.ID', 'ItemUseStyleID'),
        ItemHoldStyleID: new NativeClass('Terraria.ID', 'ItemHoldStyleID'),
        PrefixID: new NativeClass('Terraria.ID', 'PrefixID'),
        CustomCurrencyID: new NativeClass('Terraria.ID', 'CustomCurrencyID'),
        BuffID: new NativeClass('Terraria.ID', 'BuffID')
    },

    Localization: {
        Language: new NativeClass('Terraria.Localization', 'Language'),
        LanguageManager: new NativeClass('Terraria.Localization', 'LanguageManager'),
        LocalizedText: new NativeClass('Terraria.Localization', 'LocalizedText'),
        GameCulture: new NativeClass('Terraria.Localization', 'GameCulture'),
    },

    UI: {
        ItemTooltip: new NativeClass("Terraria.UI", "ItemTooltip"),
        ItemSorting: new NativeClass("Terraria.UI", "ItemSorting"),

        Chat: {
            ChatManager: new NativeClass('Terraria.UI.Chat', 'ChatManager')
        }
    },

    GameContent: {
        TextureAssets: new NativeClass('Terraria.GameContent', 'TextureAssets'),
        FontAssets: new NativeClass('Terraria.GameContent', 'FontAssets'),
        //PrefixLegacy: new NativeClass('Terraria.GameContent', 'PrefixLegacy'),
        //ItemRarity: new NativeClass('Terraria.GameContent', 'ItemRarity'),

        ItemDropRules: {
            ItemDropRule: new NativeClass('Terraria.GameContent.ItemDropRules', 'ItemDropRule'),
            ItemDropDatabase: new NativeClass('Terraria.GameContent.ItemDropRules', 'ItemDropDatabase'),
            CommonCode: new NativeClass('Terraria.GameContent.ItemDropRules', 'CommonCode')
        },

        Creative: {
            CreativeItemSacrificesCatalog: new NativeClass('Terraria.GameContent.Creative', 'CreativeItemSacrificesCatalog'),
            ItemsSacrificedUnlocksTracker: new NativeClass('Terraria.GameContent.Creative', 'ItemsSacrificedUnlocksTracker')
        },

        Events: {
            Sandstorm: new NativeClass('Terraria.GameContent.Events', 'Sandstorm')
        },

        Biomes: {
            CorruptionPitBiome: new NativeClass('Terraria.GameContent.Biomes', 'CorruptionPitBiome'),

            CaveHouse: {
                HouseUtils: new NativeClass('Terraria.GameContent.Biomes.CaveHouse', 'HouseUtils')
            },
        },

        Metadata: {
            TileMaterials: new NativeClass('Terraria.GameContent.Metadata', 'TileMaterials')
        },

        UI: {
            CustomCurrencyManager: new NativeClass('Terraria.GameContent.UI', 'CustomCurrencyManager')
        }
    },

    ObjectData: {
        TileObjectData: new NativeClass('Terraria.ObjectData', 'TileObjectData')
    },

    DataStructures: {
        PlayerDrawSet: new NativeClass('Terraria.DataStructures', 'PlayerDrawSet'),
        PlayerDeathReason: new NativeClass('Terraria.DataStructures', 'PlayerDeathReason'),
        //WingStats: new NativeClass('Terraria.DataSturctures', 'WingStats'),
        //ItemCreationContext: new NativeClass('Terraria.DataSturctures', 'ItemCreationContext')
    },

    Audio: {
        SoundEngine : new NativeClass('Terraria.Audio', 'SoundEngine')
    },
    Chat: {
        ChatCommandProcessor: new NativeClass('Terraria.Chat', 'ChatCommandProcessor')
    },

    Graphics: {
        Shaders: {
            GameShaders: new NativeClass('Terraria.Graphics.Shaders', 'GameShaders')
        }
    },

    IO: {
        WorldFile: new NativeClass('Terraria.IO', 'WorldFile'),
    },

    Initializers: {
        AssetInitializer: new NativeClass('Terraria.Initializers', 'AssetInitializer'),
        //WingStatsInitializer: new NativeClass('Terraria.Initializers', 'WingStatsInititalizer')
    },

    Utilities: {
        UnifiedRandom: new NativeClass('Terraria.Utilities', 'UnifiedRandom')
    }
}

export const Microsoft = {
    Xna: {
        Framework: {
            Vector2: new NativeClass('Microsoft.Xna.Framework', 'Vector2'),
            Vector3: new NativeClass('Microsoft.Xna.Framework', 'Vector3'),
            Vector4: new NativeClass('Microsoft.Xna.Framework', 'Vector4'),
            Rectangle: new NativeClass('Microsoft.Xna.Framework', 'Rectangle'),
            Point: new NativeClass('Microsoft.Xna.Framework', 'Point'),
            Matrix: new NativeClass('Microsoft.Xna.Framework', 'Matrix'),
            MathHelper: new NativeClass('Microsoft.Xna.Framework', 'MathHelper'),

            Graphics: {
                Texture2D: new NativeClass('Microsoft.Xna.Framework.Graphics', 'Texture2D'),
                Color: new NativeClass('Microsoft.Xna.Framework.Graphics', 'Color'),
                SpriteEffects: new NativeClass('Microsoft.Xna.Framework.Graphics', 'SpriteEffects'),
                SpriteBatch: new NativeClass('Microsoft.Xna.Framework.Graphics', 'SpriteBatch'),
                SpriteSortMode: new NativeClass('Microsoft.Xna.Framework.Graphics', 'SpriteSortMode'),
                BlendState: new NativeClass('Microsoft.Xna.Framework.Graphics', 'BlendState'),
                DepthStencilState: new NativeClass('Microsoft.Xna.Framework.Graphics', 'DepthStencilState'),
                SamplerState: new NativeClass('Microsoft.Xna.Framework.Graphics', 'SamplerState'),
                RasterizerState: new NativeClass('Microsoft.Xna.Framework.Graphics', 'RasterizerState')
            }
        }
    }
}

export const ReLogic = {
    Content: {
        Asset: new NativeClass('ReLogic.Content', 'Asset`1'),
        AssetRepository: new NativeClass('ReLogic.Content', 'AssetRepository'),
        AssetState: new NativeClass('ReLogic.Content', 'AssetState'),
        AssetRequestMode: new NativeClass('ReLogic.Content', 'AssetRequestMode'),
        AssetReaderCollection: new NativeClass('ReLogic.Content', 'AssetReaderCollection'),

        /*Sources: {
            ContentSource: new NativeClass('ReLogic.Content', 'ContentSource')
        }*/
    }
}

export const System = {
    Nullable: new NativeClass('System', 'Nullable`1'),
    Int32: new NativeClass('System', 'Int32'),
    String: new NativeClass('System', 'String'),
    Convert: new NativeClass('System', 'Convert'),
    Math: new NativeClass('System', 'Math'),
    DateTime: new NativeClass('System', 'DateTime'),
    Array: new NativeClass('System', 'Array'),

    IO: {
        File: new NativeClass('System.IO', 'File'),
        Directory: new NativeClass('System.IO', 'Directory'),
        Path: new NativeClass('System.IO', 'Path'),
        BinaryWriter: new NativeClass('System.IO', 'BinaryWriter'),
        BinaryReader: new NativeClass('System.IO', 'BinaryReader'),
        Stream: new NativeClass('System.IO', 'Stream'),
        MemoryStream: new NativeClass('System.IO', 'MemoryStream'),
        SeekOrigin: new NativeClass('System.IO', 'SeekOrigin'),

        Compression: {
            CompressionMode: new NativeClass('System.IO.Compression', 'CompressionMode'),
            DeflateStream: new NativeClass('System.IO.Compression', 'DeflateStream')
        }
    },

    Security: {
        Cryptography: {
            SHA1: new NativeClass('System.Security.Cryptography', 'SHA1')
        }
    }
}

export const Hardcore = {
  BorealEssence: {
    SnowBall: 10
  },
  
  CooperEssence: {
   Lighting: 15
}

}
export const bossAttacks = {
        Vulture: {
            subPhase1: false,
            FeatherShoot: 180
        },

        EyeServant: {
        MiniBloodDirections: 1
        },
        
        kingSlime: {
            explosive: 360,
            miniSpike: 280,
            NinjaStar: 180,
            phase2: false, 
            enraged: false
        },
        eyeCthulhu: {
            subPhase2: false,
            subPhase3: false,
            BloodDirections: 180,
            FallBlood: 280
        },
        Brain: {
	          DeathLasers: 180
        },
        skeletronHands: {
            subPhase: false
        },
        skeletron: {
            subPhase1: false,
            shadowFlame1: 240,
            subPhase2: false,
            shadowFlame2: 180,
            subPhaseDust1: false,
            subPhaseDust2: false
        },
        spazmatism: {
            subPhaseSpaz1: false,
            subPhaseSpaz1Timer: 420,
            subPhaseSpaz2: false,
            subPhaseSpaz2Timer: 360,
            subPhaseSpaz3: false,
            subPhaseSpaz3Timer: 270,
            subPhaseDust: false
        },
        retinazer: {
            subPhaseReti1: false,
            subPhaseReti1Timer: 420,
            subPhaseReti2: false,
            subPhaseReti2Timer: 360,
            subPhaseReti3: false,
            subPhaseReti3Timer: 270,
            subPhaseDust: false
        },
        destroyer: {
            laserTimer: 600,
            laserTimer2: 9999,
            subPhase1: false,
            subPhase2: false,
            subPhase3: false,
            subPhase4: false,
            realPhase2Message: 0,
            realPhase2Message2: 0,
            realPhase2Transition0: false,
            realPhase2: false,
            homingRockets: 240,
            frostTimer: 480,
            finalStand: false
        },
        destroyerBody: {
            subPhase1: false,
            realPhase2Transition0: false,
            p2Laser: 660
        },
        destroyerTail: {
            laserBurst1: 600,
            subPhase1: false,
            laserBurst2: 660,
            subPhase2: false,
            realPhase2Transition0: false,
            tailLaser: 210
        },
        skeletronPrime: {
            subPhase1: false,
            subPhase2: false,
            subPhase3: false,
            laserTimer1: 210,
            laserTimer2: 150,
            homingRockets1: 210,
            homingRockets2: 150,
            subPhaseDust1: false,
            subPhaseDust2: false,
            subPhaseDust3: false
        },
        cultist: {
            subPhase1: false,
            shadowFlame: 600,
            sharknado: 900,
            subPhase2: false,
            trident: 600,
            demonScythe: 660,
            sandnado: 780,
            subPhase3: false,
            goldenShower: 900,
            flameScythe: 480,
            frostWave: 540,
            subPhase4: false,
            prismaticBolt: 20,
            runeBlast: 300,
            deathSickle: 240
        }
    };