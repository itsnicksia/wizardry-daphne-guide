# Weapon Type Analysis

Selecting the proper weapon for your characters is an important consideration when you're building an adventurer and constructing your party. A very common misconception is that the number of hits are the only thing that matters or a 1h hitting twice is always better than a 2h hitting once, and these statements are simply not true for a majority of the player base. There is a lot more nuance that can go into weapon selection, so I want to highlight the key advantages of the different weapon types we have available to us.

!!! note "Disclaimer"
    This is largely based on the opinion of TheAxolotl and applies to the majority of the player base. Those that have spent a lot of time getting the best gear possible can, for the most part, ignore the nuances of each weapon type and focus mostly on the number of attacks, as that shines when you are able to greatly overcome enemy defenses constantly.

## Weapon Types

### Axes
Axes have the property `Defense Penetration` which causes any attack to ignore 30% of the target's defense. They can hit a single row ahead at full strength, but hitting two or more rows ahead results in lower damage and Accuracy. They are extremely useful when facing high-defense enemies like slimes, clouds, and many bosses.

#### One-Handed Axes
One-Handed Axes are primarily single-hit weapons with a high damage per hit and their base stats provide a moderate increase to Accuracy. They can be used by Fighters, Knights, and Thieves.

#### Two-Handed Axes
Two-Handed Axes are primarily single-hit weapons with a high damage per hit and their base stats provide a moderate decrease to Action Speed and Evasion. They have the property `Strength+` that adds `STR * 0.75 * ClassModifier` to an adventurer's Attack Power. They can be used by Fighters and Knights.

### Bows
Bows are primarily single-hit weapons with a high damage per hit and base stats provide a minor increase to Accuracy. They have the property `Strength+` that adds `STR * 0.75 * ClassModifier` to an adventurer's Attack Power. They can hit any row at full strength and suffer no position-related penalties to damage or Accuracy. They can be used by Fighters, Knights, and Thieves. Notably, bows are the only two-handed option that Thieves have.

### Daggers
Daggers are primarily multi-hit weapons with low damage per hit and their base stats provide a high increase to Accuracy and a minor increase to Action Speed and Evasion. Daggers have the property `Nimble Strike`, which increases Surety by roughly 10% (rounded down) of the Adventurer's DEX. They can hit a single row ahead at full strength, but hitting two or more rows ahead results in lower damage and Accuracy. In order to overcome their innately lower base damage, they are best used along side attack skills. They can be used by Fighters, Knights, Thieves, and Mages.

### Maces
Maces have the properties `Inflict Stun` and `Evasion Damage`. `Inflict Stun` gives any attack (including skills) a chance (roughly 10%) to stun an enemy and triggers independently of the stun property of `Stun Bash`. I'm not entirely sure which of the two gets checked first when determining if the stun is applied. `Evasion Damage` prevents attacks from missing. When an attack would miss, it instead deals roughly half of its normal damage. Interestingly, this `Evasion Damage` is able to be a sure hit. They are extremely useful when facing high-evasion enemies.

#### One-Handed Maces
One-Handed Maces are primarily single-hit weapons with a moderate-high damage per hit and their base stats provide a minor increase to Accuracy and Evasion, as well as a minor decrease to Surety. They can hit a single row ahead at full strength, but hitting two or more rows ahead results in lower damage and Accuracy. They can be used by Fighters, Knights, Thieves and Priests.

#### Two-Handed Maces
Two-Handed Maces are primarily single-hit weapons with a moderate-high damage per hit and their base stats provide a moderate decrease to Action Speed and Evasion, as well as a minor decrease to Surety. They have the property `Strength+` that adds `STR * 0.75 * ClassModifier` to an adventurer's Attack Power. They can hit a single row ahead at full strength, but hitting two or more rows ahead results in lower damage and Accuracy. They are extremely useful when facing high-evasion enemies. They can be used by Fighters, Knights, and Priests.

### Spears
Spears are primarily single-hit weapons with a moderate damage per hit and their base stats provide a moderate-high increase to Accuracy and a low increase to Evasion. They have the property `Strength+` that adds `STR * 0.75 * ClassModifier` to an adventurer's Attack Power. They can hit up to two rows ahead at full strength, but hitting more than two rows ahead results in lower damage and Accuracy. They can be used by Fighters and Knights.

### Staves

#### One-Handed Staves
One-Handed Staves are primarily single-hit weapons with a very low damage per hit and their base stats provide a moderate increase to Magic Power and/or Divine Power and a minor increase to Evasion. They can be used by Fighters, Knights, Thieves, Mages, and Priests.

#### Two-Handed Staves
Two-Handed Staves are primarily single-hit weapons with a low damage per hit and their base stats provide a high increase to Magic Power and/or Divine Power and a minor decrease to Evasion. They have the property `Strength+` that adds `STR * 0.75 * ClassModifier` to an adventurer's Attack Power, which is silly because their primary use is to provide a large boost to Magic/Divine Power. They can be used by Fighters, Knights, Mages, and Priests.

### Swords

#### One-Handed Swords
One-Handed Swords are primarily multi-hit weapons with a moderate damage per hit and their base stats provide a moderate-high increase to Accuracy and a minor increase to Evasion. They can hit a single row ahead at full strength, but hitting two or more rows ahead results in lower damage and Accuracy. They can be used by Fighters, Knights, and Thieves.

#### Two-Handed Swords
Two-Handed Swords are primarily single-hit weapons with a high damage per hit and their base stats provide a moderate increase to Accuracy and a minor decrease to Action Speed and Evasion. They have the property `Strength+` that adds `STR * 0.75 * ClassModifier` to an adventurer's Attack Power. They can hit a single row ahead at full strength, but hitting two or more rows ahead results in lower damage and Accuracy. They are extremely useful when facing high-defense enemies like slimes, clouds, and many bosses. They can be used by Fighters and Knights.

## One-Handed vs Two-Handed Weapons - TheAxolotl's Thoughts
This topic is fairly hotly-debated, and many people have the opinion that One-Handed Weapons are vastly superior to Two-Handed Weapons due to the fact you can use a shield for additional stats with the former and that the most commonly-used 1h Weapons (Daggers and Swords) have multiple hits. When facing an enemy with 0 or extremely low defense, or when your adventurer has a very high amount of Attack Power coming from non-weapon sources, this isn't necessarily a bad assumption, but there are a few things to keep in mind.

1. A large majority of the player base is not at that gear level, and it's very rare to be facing enemies with next-to-zero defense. The Greater Demon that spawns as part of the Lingering Scent request has ~100 defense, enemies with 50-75 defense are extremely common. In addition, slimes and clouds seem to have 150+ defense.
2. Multiple hits come with a few trade-offs. Each hit in a multiple-hit attack rolls its Accuracy and Surety independently. If you're not at the point where you are hitting 100% of the time missing one out of two hits is effectively a 50% damage loss. If you're not at the point where you're landing Sure Hits 100% of the time, only having one Sure Hit land is effectively only a ~38% to 50% damage increase instead of the expected 75% to 100% damage increase.
3. Battle mechanics such as hitting a sleeping enemy or an `Opening` only apply to one hit, so the second hit in a multi-hit attack cannot take advantage of the damage bonus.
4. The passive skill `Follow-Up Attack` triggers on attack and not on hit, which effectively lets it make 2h Weapons hit for 2x damage and multi-hit weapons hit for 1.5x damage or even 1.3x damage (I'm looking at you, Blade Cuisinart).
5. `Strength+` is actually pretty solid. My level 50 MC has 62 STR as a Fighter. This nets an extra 56 Attack Power when using 2h Weapons. When combined with the higher base Attack Power, that gives you a much easier time getting past enemy defenses or increasing the gap between your adventurer's Attack Power and the enemy's defense, thus increasing your overall damage. This increase, particularly when you look at other damage multipliers, can end up outperforming the additional hits.

With those points in mind, am I saying 2h Weapons are better than 1h Weapons? No, I won't ever make that blanket statement. I also won't say 1h Weapons are better than 2h Weapons. What I will do is outline a few areas where I think certain weapons really shine.

* `Follow-Up Attack` builds. This skill is very powerful and can easily out-perform some active skills at high levels, while simultaneously saving your SP. You will get the most out of it with 2h Weapons.
* Turtle builds. In these builds, you generally want your front line to be in defensive mode, while your back line attacks from range. Bows and Spears can be great for this, as well as Daggers and 1h Swords from Thieves with `Sneak Attack`.
* When you are up against something with a very small amount of defense or you have extremely strong gear with lots of offensive modifiers (Attack Power, Surety, etc), 1h Swords are hard to beat. Getting multiple attacks in is very good, particularly if no hits miss and all hits are Sure Hits.
* Thieves that want to spam Precision Strike or Sneak Attack do very well with Daggers, 1h Swords, and Bows.
* High defense enemies can be overcome very easily with both 1h and 2h Axes.
* High evasion enemies can be overcome very easily with both 1h and 2h Maces.
* Front-line Knights with low accuracy can make solid use out of 1h Maces. In this role, they're much more focused on utility and potentially landing a stun than damage.
* Front-line Priests that have some turns free from healing or buffing can make decent use out of 1h Maces. They, like the Knights, can hopefully land some stuns during turns where they don't need to heal or buff.

One other thing to keep in mind is that switching weapons in-combat doesn't cost anything. You can always pick a 1h or 2h weapon to use as your primary, then switch to something else when you face a high defense or high evasion enemy. Alternatively, if your main weapon is an Axe, switching to a Sword or Mace against very low defense enemies can net you a bit more damage.

All weapon types are extremely viable and there ultimately isn't a "best" one. 1h Maces and 2h Swords do seem to get the short end of the stick a bit, but can still be very effective.