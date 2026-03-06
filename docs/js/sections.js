window.RESPAWN_SECTIONS = [
    {
      title: 'Ancient Mausoleum',
      items: [
        {
          id: 'cauldron_mausoleum',
          title: 'Crucible Mausoleum Reset',
          details: 'A new set of 4 to 6 Adventurer’s Remains become available in the Crucible Mausoleum every 2 weeks.',
          reset: { 
            reference: '2025-05-31T10:00:00',  // Initial reset anchor time (local time) 
            intervalWeeks: 2                   // Repeat every 2 weeks 
          },
          image: '',                           // No image: remains non-clickable 
          clickable: false
        },
        {
          id: 'furnace_tallow',
          title: 'Tallow of Bone Summoning - Furnace of Deathsmoke',
          details: 'Furnace of Deathsmoke located at the Ancient Mausoleum selection screen. Produces one tallow every 7 days.',
          image: '/abyss-guides/ancient-mausoleum/img/maus-furnace.jpg', 
          clickable: true
        },
        {
          id: 'bonepicker_tallow',
          title: 'Tallow of Bone Summoning - Bone Picker',
          details: 'The wandering Bone Picker will sell you one tallow for 10,000gp every 7 days.',
          image: '/abyss-guides/1-beginning-abyss/img/a1-bone-picker.jpg', 
          clickable: true
        }
      ]
    },
    {
      title: "Adventurer’s Remains",
      items: [
        { subheader: 'Beginning Abyss' },
        {
          id: 'b1f_awakened_chamber',
          title: 'Old Remains: Cursed Wheel to Awakening',
          details: 'Part of the Intro. [30 days]',
          image: '/appendices/img/respawning-bone-death-stench.jpg',
          clickable: false
        },
        {
          id: 'b1f_stench_quest',
          title: 'Class Remains: B1F (Death Stench Investigation Request)',
          details: 'Wheel to Kings Rescue, accept the Request in the Adventurers Guild, and head to the location. [30 days]',
          image: '/tools/img/bones/respawning-bone-death-stench.jpg',
          clickable: true
        },
        {
          id: 'b3f_goblin_south',
          title: 'Adventurer’s Remains: B3F (Goblin’s Nest - chest)',
          details: 'Wheel to Kings Rescue and head to the chest location south of the Goblin Nest entrance. [30 days]',
          image: '/tools/img/bones/respawning-bone-goblin-den.jpg',
          clickable: true
        },
        {
          id: 'b3f_goblin_northeast',
          title: 'Adventurer’s Remains: B3F (Goblin’s Nest - Goblin Boss)',
          details: 'Wheel to Kings Rescue and head to the goblin fight in the northeast. [30 days]',
          image: '/tools/img/bones/respawning-bone-goblin-den.jpg',
          clickable: true
        },
        {
          id: 'b4f_rubble',
          title: 'Adventurer’s Remains: B4F',
          details: 'Assuming you wheeled to Kings Rescue already, head to the location. It\'s in the Left chest. If you take the one on the Right, the bone chest disappears! [30 days]',
          image: '/tools/img/bones/respawning-bone-b4f.jpg',
          clickable: true
        },
        {
          id: 'b5f_toxin_swamps',
          title: 'Adventurer’s Remains: B5F',
          details: 'Assuming you wheeled to Kings Rescue already, head to the location. [30 days]',
          image: '/tools/img/bones/respawning-bone-b5f.jpg',
          clickable: true
        },
        {
          id: 'b6f_before_statue',
          title: 'Adventurer’s Remains: B6F',
          details: 'Same as above, you need to come in from B5F to take the portals. [7 days]',
          image: '/tools/img/bones/respawning-bone-b6f.jpg',
          clickable: true
        },
        {
          id: 'b7f_rubble_reverse',
          title: 'Adventurer’s Remains: B7F',
          details: 'Same as below, you need to first drop the rocks on B8F. [30 days]',
          image: '/tools/img/bones/respawning-bone-b7f.jpg',
          clickable: true
        },
        {
          id: 'b8f_nutrient',
          title: 'Adventurer’s Remains: B8F',
          details: 'Assuming you wheeled to Kings Rescue already, head to the location. Watch out, this chest might be a mimic. [30 days]',
          image: '/tools/img/bones/respawning-bone-b8f.jpg',
          clickable: true
        },
        { subheader: 'Trade Waterway' },
        {
          id: 'trade_waterway_pier',
          title: 'Adventurer’s Remains: 7th District (Shore of the Dead)',
          details: 'Bone will not respawn after Abyss 2 GWO is killed. You will need to cursed wheel before then. [30 days]',
          image: '/tools/img/bones/respawning-bone-pier-location.jpg',
          clickable: true
        },
        { subheader: 'Impregnable Fortress' },
        {
          id: 'fortress_catacombs',
          title: 'Adventurer’s Remains: Catacombs',
          details: 'Solve the candle puzzle to open the door to the room with the bone. Touch the door, touch it again to activate puzzle, then light candles in that order shown in image. (x:2, y:19) [30 days]',
          image: '/tools/img/bones/respawning-bone-catacomb.jpg',
          clickable: true
        },
        { subheader: 'Deepsnow Hinterlands' },
        {
          id: 'isberg_berrypatch',
          title: 'Adventurer’s Remains: Berry Patch',
          details: '[30 days]',
          image: '',
          clickable: false
        },
        { subheader: 'Other'},
        {
          id: 'bonepicker_bone',
          title: 'Adventurer’s Remains - Bone Picker',
          details: 'The wandering Bone Picker will sell you one set of Adventurer’s Remains for 1,000gp every 7 days.',
          image: '/abyss-guides/1-beginning-abyss/img/a1-bone-picker.jpg', 
          clickable: true
        }
      ]
    },
    {
      title: 'Equipment, Items, and Request Rewards',
      items: [
        { subheader: 'Beginning Abyss' },
        { subheader: 'Chest Items' },
        {
          id: 'abyss_b1f_feathered',
          title: 'Feathered Cap',
          details: 'Chest in B1F 3-chest room (x:23, y:11) [2 days]',
          image: '/tools/img/other/respawning-feathered-hat-a1-b1f.jpg',
          clickable: true 
        },
        {
          id: 'abyss_b3f_exorcism',
          title: 'Exorcism Leather',
          details: 'Chest in B3F (x:24, y:9) [2 days]',
          image: '/tools/img/other/respawning-exorcism-leather-a1-b3f.jpg',
          clickable: true,
        },
        {
          id: 'abyss_b3f_resistance',
          title: 'Ring of Resistance',
          details: 'Chest in B3F (x:12, y:19) [2 days]',
          image: '/tools/img/other/respawning-ring-of-resistance-a1-b3f.jpg',
          clickable: true,
        },
        {
          id: 'abyss_b4f_halberd',
          title: 'Halberd',
          details: 'Chest in B4F (x:2, y:4) [2 days]',
          image: '/tools/img/other/respawning-halberd-a1-b4f.jpg',
          clickable: true,
        },
        {
          id: 'abyss_b5f_huntsman',
          title: "Huntsman's Bow [2 days]",
          details: 'Chest in B5F Southwest 3-chest room (x:8, y:2)',
          image: '/tools/img/other/respawning-huntsman-bow-a1-b5f.jpg',
          clickable: true,
        },
        {
          id: 'abyss_b5f_breeze',
          title: 'Sword of the Breeze',
          details: 'Chest in B5F East 3-chest room (x:22, y:15) [1 week]',
          image: '/tools/img/other/respawning-breeze-sword-a1-b5f.jpg',
          clickable: true,
        },
        {
          id: 'bracelet_of_impurity',
          title: 'Bracelet of Impurity',
          details: 'Chest in B8F (x:0, y:22) - respawns daily',
          image: '/tools/img/other/respawning-impurity-bracelet-a1-b8f.jpg',
          clickable: true,
        },
        {
          id: 'a1_b8f_nourishingpotions',
          title: 'Nourishing Draught x3',
          details: 'Chest in B8F (x:19, y:12) - respawns daily',
          image: '/tools/img/other/respawning-sp-pots-a1-b8f.jpg',
          clickable: true,
        },
        { subheader: 'Request Rewards' },
        {
          id: 'a1_royal_family_ring',
          title: 'Royal Family Ring',
          details: 'Optional request Reward from "Sweet Walnut Collection" [30 days]',
          image: '',
          clickable: false,
        },
        {
          id: 'bracelet_of_urgency',
          title: 'Bracelet of Urgency',
          details: 'Request Reward from "Knight-Butcher Ent Proliferation" [30 days]',
          image: '',
          clickable: false,
        },
        {
          id: 'undead_ward',
          title: 'Undead Ward',
          details: 'Request Reward from "Abyss Heretics" [30 days]',
          image: '',
          clickable: false,
        },
        {
          id: 'plague_mask',
          title: 'Plague Mask',
          details: 'Request Reward from clear all waves in "March of the Undead" [30 days]',
          image: '',
          clickable: false,
        },
        {
          id: 'digger_pickaxe',
          title: 'Digging Mattock',
          details: 'Request Reward from (not) "Saving Lambert" [30 days]',
          image: '',
          clickable: false,
        },
        {
          id: 'royal_amulet',
          title: 'Royal Herald Amulet',
          details: 'Request Reward from "Save the King" [30 days]',
          image: '',
          clickable: false,
        },
        { subheader: 'Trade Waterway' },
        { subheader: 'Chest Items' },
        {
          id: 'a2-district1-manapots',
          title: 'Mana Elixir x2',
          details: 'Chest in 1st District behind locked door (x:10, y:22). Respawns monthly.',
          image: '/tools/img/other/respawning-mana-pot-a2-district1.jpg',
          clickable: true,
        },
        {
          id: 'a2-district2-nourishingpotions',
          title: 'Nourishing Draught x3',
          details: 'Chest in 2nd District southeast room (x:21, y:10). Respawns monthly.',
          image: '/tools/img/other/respawning-sp-pot-a2-district2.jpg',
          clickable: true,
        },
        {
          id: 'lightfoot_sandals',
          title: 'Light Sandals',
          details: 'Chest in 3rd District near ambush room (x:17, y:1). Respawns monthly.',
          image: '/tools/img/other/respawning-light-sandals-a2-district3.jpg',
          clickable: true,
        },
        {
          id: 'thieves_gloves',
          title: "Thieves' Gloves",
          details: 'Chest in 4th District near Harken room (x:26, y:20). Respawns monthly.',
          image: '/tools/img/other/respawning-thieves-gloves-a2-district4.jpg',
          clickable: true,
        },
        {
          id: 'a2-dist4-dagger_of_the_soil',
          title: 'Dagger of the Soil',
          details: 'Chest in 4th District in the northwest room (x:0, y:22). Respawns weekly.',
          image: '/tools/img/other/respawning-earth-dagger-a2-district4.jpg',
          clickable: true,
        },
        {
          id: 'man_eater',
          title: 'Man-Eater',
          details: 'Chest in 5th District (x:6, y:23). Respawns monthly.',
          image: '/tools/img/other/respawning-man-eater-a2-district5.jpg',
          clickable: true,
        },
        {
          id: 'mask_water_deity',
          title: 'Mask of the Water God',
          details: 'Chest in 6th District (x:7, y:22). Respawns monthly.',
          image: '/tools/img/other/respawning-mask-of-the-water-god-a2-district6.jpg',
          clickable: true,
        },
        {
          id: 'a2-ship2-manapots',
          title: 'Mana Elixir x3',
          details: 'Chest in Ship 2 Treasure Room (x:14, y:13) with 2x Deep-Water Gleaming Crystals. Respawns monthly.',
          image: '/tools/img/other/respawning-mana-pot-a2-ship2.jpg',
          clickable: true,
        },

        { subheader: 'Request Rewards' },
        {
          id: 'bird_dropper',
          title: 'Bird-Dropper',
          details: 'Request Reward from "Hydra Plant Procurement". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'bloodstained_gloves',
          title: 'Bloodstained Gloves',
          details: 'Request Reward from "Servant and Cargo Recovery" (select "Turn them all over to the merchant"). Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'melgina_choker',
          title: 'Melgina’s Choker',
          details: 'Defeat Octonarus after giving Melgina the Mackerel Sandwich. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'octonaras_necklace',
          title: 'Octonarus’s Necklace',
          details: 'Defeat Octonarus after giving Melgina the Titanium Knife. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'tyranny_cutlass',
          title: 'Cutlass of Tyranny',
          details: 'Choose "Octonarus‘s Cherished Sword" after defeating Octonarus. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'quest-reward-2a-princess-route',
          title: 'Shield of Honor',
          details: 'Request Reward from "Missing Person (Princess Route)". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'quest-reward-2a-pontiff-route',
          title: 'Book of Sanctuary\'s Blessing Secrets',
          details: 'Request Reward from "Missing Person (Pontiff Route)". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'quest-reward-2a-admiral-route',
          title: 'Twin Pearls',
          details: 'Request Reward from "Missing Person (Admiral Route)". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'sea_god_pearl',
          title: 'Pearl of the Sea God',
          details: 'Quest Reward from "Arena Tournament by Avare". Respawns monthly.',
          image: '',
          clickable: false,
        },

        { subheader: 'Impregnable Fortress' },
        { subheader: 'Chest Items' },
        {
          id: 'a3_z2_nourishingpotions',
          title: 'Nourishing Draught x3',
          details: 'Chest in Zone 2 (x:4, y:15). Chest also contains 1-2x Crimson Lustrous Ore + Scroll of Flash. [2 days].',
          image: '/tools/img/other/respawning-sp-pots-a3-zone2.jpg',
          clickable: true,
        },
        {
          id: 'skull_necklace_chest',
          title: 'Skull Necklace - Zone 2 chest',
          details: 'Chest in Zone 2 (x:23, y:25). Requires low corrosion (exact level uncertain). Respawns monthly.',
          image: '/tools/img/other/respawning-skull-necklace-a3-zone2.jpg',
          clickable: true,
        },
        {
          id: 'goats_cloak_a3_chest',
          title: 'Goatskin Cloak',
          details: 'Chest in Zone 6 (x:24, y:14). Respawns monthly.',
          image: '/tools/img/other/respawning-goatskin-cloak-a3-zone6.jpg',
          clickable: true,
        },
        {
          id: 'a3_z9_mana_pots',
          title: 'Mana Elixir x3',
          details: 'Chest in Zone 9 (x:16, y:0). Respawns monthly.',
          image: '/tools/img/other/respawning-mana-pot-a3-office.jpg',
          clickable: true,
        },
        {
          id: 'a3_z10_scroll_sharedhealing',
          title: 'Scroll of Shared Healing',
          details: 'Chest in Zone 10 ("Bottom of Statue Room"). Respawns monthly.',
          image: '',
          clickable: true,
        },

        { subheader: 'Request Rewards' },
        {
          id: 'skull_necklace_quest',
          title: 'Skull Necklace - Request Reward',
          details: 'Quest Reward from "Putting Evil Spirits to Rest". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'enemy_scope',
          title: 'Enemy Spyglass',
          details: 'Request Reward from "Bodyguard for Ruins Exploration". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'demonic_crystal',
          title: 'Magic-Made Crystal',
          details: 'Request Reward from "Forbidden Area Search Escort". Select "I know all about your family\'s sins" (4th option) at the end of the quest. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'goats_cloak_a3reward',
          title: 'Goatskin Cloak',
          details: 'Request Reward from "Antique Scarlet Doll". Select handing all the dolls in. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'antique_ring_a3reward',
          title: 'Antique Ring (100k gp)',
          details: 'Request Reward from "Antique Scarlet Doll". Select handing no dolls in. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'knights_cloak',
          title: 'Knight’s Cloak',
          details: 'Request Reward from "Expedition to Clear the Fortress Lower Levels". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'glittering_ring',
          title: 'Shining Finger Band',
          details: 'Reward from beating Morgus, God of Death. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'elegant_dancer',
          title: 'Elegant Dancer',
          details: 'Admiral Route Clear Reward. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'tome_shieldbearer',
          title: 'Book of Steadfast Shield Soldier Secrets',
          details: 'Princess Route Clear Reward.  Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'holy_white_gem',
          title: 'Holy White Stone',
          details: 'Pontiff Route Clear Reward. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'embroidered_hankerchief',
          title: 'Golden Embroidered Handkerchief',
          details: 'Request Reward from Cleanup Operation quest reward. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'everlasting_lily',
          title: 'Everlasting Lily',
          details: 'Request Reward from "Requiem for the Evil Spirit" quest. Respawns monthly.',
          image: '',
          clickable: false,
        },
        { subheader: 'Deepsnow Hinterlands' },
        { subheader: 'Chest Items' },
        {
          id: 'a4_r8_nourishingpotions',
          title: 'Nourishing Draught x2',
          details: 'Route 10 (x:10, y:20).',
          image: '',
          clickable: false,
        },
        {
          id: 'a4_r10_mana_pots',
          title: 'Mana Elixir x3',
          details: 'Route 10 (x:18, y:7). Respawns monthly.',
          image: '',
          clickable: false,
        },
        { subheader: 'Golden Mimics' },
        {
          id: 'a4_goldmimic_r7_northeast',
          title: 'Golden Mimic - Route 7',
          details: 'North east part of map. Respawns monthly.',
          image: '',
          clickable: false,
        },        
        {
          id: 'a4_goldmimic_r8_poisonpool',
          title: 'Golden Mimic - Route 8',
          details: 'Guarded poison pool. (x:14, y:10). Respawns monthly.',
          image: '',
          clickable: false,
        },        
        {
          id: 'a4_goldmimic_r9_upontherooftop',
          title: 'Golden Mimic - Route 9',
          details: 'Top of the house. (x:12, y:24) Respawns monthly.',
          image: '',
          clickable: false,
        },        
        {
          id: 'a4_goldmimic_r10',
          title: 'Golden Mimic - Route 10',
          details: 'Guarded by miniboss, next to Nourishing Draughts. (x:2, y:0). Respawns monthly.',
          image: '',
          clickable: false,
        },        
        {
          id: 'a4_goldmimic_church_grounds_west',
          title: 'Golden Mimic - Church Grounds',
          details: 'Above Church. In blizzard. (x:17, y:26). Respawns monthly.',
          image: '',
          clickable: false,
        },
        { subheader: 'Request Rewards' },
        {
          id: 'a4_gull_equipment_mastery',
          title: 'Book of Gull\'s Equipment Mastery',
          details: 'Admiral Route Clear Reward. Respawns monthly.',
          image: '',
          clickable: false,
        },
      ]
    }
  ];