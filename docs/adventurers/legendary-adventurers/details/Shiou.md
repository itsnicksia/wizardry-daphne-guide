---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.

   title: Shiou
---

{% set chardata = pd_read_csv('../data/adventurers.csv', 
   index_col='Name').fillna("").loc[title] %}

# {{title}}  
## Basic Info:  
**Rarity**: {{ chardata['Rarity'] }}  
**Race**: {{ chardata['Race'] }}  
**Gender**: {{ chardata['Gender'] }}  
**Type**: {{ chardata['Type'] }}  
**Personality**: {{ chardata['Personality'] }}  
**Starting Class**: {{ chardata['Primary Class'] }}  
**Class Change**: {%if chardata['Secondary Class'] %}{{ chardata['Secondary Class'] }}{% else %}None{% endif %}  
{%if False %}**Alternate Style**: {{ chardata['Secondary Class'] }}{% endif %}  


## Base Traits  
<div class="nofilter-table nosort-table char-traits-table" markdown>
{{ populate_quicklist(file='adventurers.csv', return_columns=['Strength','IQ','Piety','Vitality','Dexterity','Speed','Luck'], filter_column="Name",filter_values=[title]) | convert_to_md_table }}  
</div>


??? info "Portraits"
    === "{{chardata['Primary Class']}}"
        ![](../img/{{title.replace(" ","-") | lower }}-{{chardata['Primary Class'].replace(" ","-") | lower}}.jpg)
{% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}}"
        ![](../img/{{title.replace(" ","-") | lower }}-{{chardata['Secondary Class'].replace(" ","-") | lower}}.jpg)
{% endif %}
 
{% if chardata['Personal Request'] %}
    === "{{chardata['Primary Class']}} after Personal Request"
        ![](../img/{{title.replace(" ","-") | lower }}-{{chardata['Primary Class'].replace(" ","-") | lower}}-personal-request.jpg)
  {% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}} after Personal Request"
        ![](../img/{{title.replace(" ","-") | lower }}-{{chardata['Secondary Class'].replace(" ","-") | lower}}-personal-request.jpg)
  {% endif %}
{% endif %}

{% if chardata['Alternate Style'] %}
    === "{{chardata['Alternate Style']}}"
        ![](../img/{{title.replace(" ","-") | lower }}-{{chardata['Alternate Style'].replace(" ","-") | lower}}.jpg)
{% endif %}

## Skills
<!-- 
skills will automatically fill
extra text can be added between skills
-->

{% if chardata['Alternate Style'] %}
!!! note "If standard {{title}} and {{chardata['Alternate Style']}} {{title}} are merged, inheritable skills are shared by both styles, but changing styles will swap any style-specific uninheritable passive and discipline skills."
{% endif %}

!!! info "Inheritable Skill"
    === "{{chardata['Inheritable Skill']}} {% if chardata['Alternate Inheritable Skill'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Inheritable Skill']) }}

 {% if chardata['Alternate Inheritable Skill'] %}
    === "{{chardata['Alternate Inheritable Skill']}} ({{chardata['Alternate Style']}})"
        {{ get_skill_description(chardata['Alternate Inheritable Skill']) }}
 {% endif %}

{% if chardata['Potential Inherit'] %}
!!! info "Potential Inherit"
    === "{{chardata['Potential Inherit']}}"
        {{ get_skill_description(chardata['Potential Inherit']) }}
{% endif %}
       
!!! info "Unique Skill (Not Inheritable)"

    === "{{chardata['Unique Skill (Not Inheritable)']}} {% if chardata['Alternate Unique Skill (Not Inheritable)'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Unique Skill (Not Inheritable)']) }}

 {% if chardata['Alternate Unique Skill (Not Inheritable)'] %}
    === "{{chardata['Alternate Unique Skill (Not Inheritable)']}} ({{chardata['Alternate Style']}})"
        {{ get_skill_description(chardata['Alternate Unique Skill (Not Inheritable)']) }}
 {% endif %}

!!! info "Discipline Skill"
    === "{{chardata['Discipline']}} {% if chardata['Alternate Discipline'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Discipline']) }}

{% if chardata['Alternate Discipline'] %}
    === "{{chardata['Alternate Discipline']}} ({{chardata['Alternate Style']}})"
        {{ get_skill_description(chardata['Alternate Discipline']) }}
{% endif %}

## Adventurer Reviews

??? info "TheAxolotl's Analysis"

    Shiou, our first legendary Samurai, has the potential to be an incredibly powerful damage dealer with a high risk and high reward play style. We won't see her true potential for a few days at least since Samurai seem to be following the Ninja's advanced class experience trend, so this review is very subject to change, but at an initial glance, I absolutely love her kit and play style.

    First, let's talk about her non-inheritable skill, Ephemeral Illusion Stance. This is our first "massive" type skill, which hits extremely hard with good gear. By extremely hard, I mean boss-killing hard where we're easily seeing mediocre-geared Shious hitting for 6k+ damage. It does have some pretty big limitations, but it is complemented extremely well by the rest of the Samurai kit in general. Speed tuning your party will be quite important for this, since the 30% HP requirement can put her in "one more hit will kill me" range, so being able to heal Shiou up after she attacks but before the enemies attack will be helpful. In addition, there is a bit of anti-synergy with Lana's post-battle heal if you're looking to use this skill when farming, however it should be a non-issue during Sentry or boss fights.
    
    Moving on to her inheritable skill, Lingering Blossom is interesting. At a glance, it's a souped up Warrior's Battle Cry in that it provides an Attack Power boost, a Surety boost, a Savia-like taunt, Shelirionach-like protection from dying due to damage, and further Attack Power, Surety, and Evasion increases upon not dying. The additional functionality in this skill is much harder to evaluate since we are unable to see the actual magnitude of stat changes in combat, however it has great synergy with Ephemeral Illusion Stance, as well as a couple other Samurai passives. One thing to note is that the Attack Power boost seems to be roughly comparable to a level 1 WBC, however WBC is going to be much easier to inherit to higher levels, so it likely won't stay competitive from a pure Attack Power boost perspective. The value prop here is in the entire host of buffs that the skill provides. If inheriting to another adventurer, the skill wording implies that the only reduction is going to be on the proc component but not on the initial Attack Power + Surety boost. That needs to be verified for sure, though. Inheriting this to another adventurer probably won't be that useful given the easier accessibility of WBC as an inherit, but it has the potential to be incredibly powerful on Shiou herself, as long as you're willing to spend a turn on it.

    Regarding buffs, the Attack Power and Surety boosts from Lingering Blossom each take up one of the buff slots, so be careful if you're using this in combination with MACALDIA or Prayer of Rebellion, as you can inadvertently push off a buff you don't want to. The increased chance of Shiou being targeted appears to act as a self-affliction and does not go against the buff count, which is an important consideration. Casting MACALDIA first and Lingering Blossom second results in Shiou having 2 Surety buffs and one Attack Power buff, which is pretty much ideal for her.

    Samurai in general are at their best when actively using skills, so they might potentially be weaker than Fighters if you're just doing auto-attack farming, however there are some reports of Shiou (or Samurai in general) being able to put out FPS levels of damage every turn, which is quite substantial.

    One other thing to note is that Cresting Wave Stance actually uses a basic attack for its damage, which is able to trigger Follow-Up Attack. While this won't ever contribute a large amount of damage, it's still a nice bit of synergy that exists.

    Regarding her Discipline, you can't do any better than Attack Power + Surety for a physical damage dealer. That being said, I personally think saving any dupes for inheriting to her own Lingering Blossom is likely going to be the stronger option overall, just due to the high value prop of her self buff. We can't see the magnitude of the increases, but it should be much more substantial than the paltry increase to Attack Power and Surety that Discipline provides.

    There are a few important legendary inherits to consider for her, as well. She will greatly benefit from Alice, Debra, and Adam inherits. The latter is least important, but can be quie nice since Ephemeral Illusion Stance is locked to the Air type.

    All in all, this is probably my favorite kit for a single purpose damage dealer. In many cases, Ephemeral Illusion Stance skill will not be seeing use, but the synergy she has in her kit as a whole is really exciting to me, and I'm looking forward to experimenting with her over the next couple weeks. Keep in mind that many people will not like the high risk nature of her kit, so before pulling, consider what you want from a physical damage dealer.

??? info "Frobro's Analysis"

    Sheesh; this one is not straightforward at all. On one hand, Samurai as a class seems needlessly complicated for what amounts to damage on par with fighters, or, for more work from both grinding their specific gear and manually using skills in battle, a little better. On the other hand, this feels like Sheli 2.0. Mind-numbingly high damage from her bizarre uninheritable skill out the box…that we can level up for some reason?

    Let's start with the small stuff. Air + Beastfolk + Female helps alleviate Samurai's lower speed problem without needing to waste buff slots on ASPD, which especially matters here because you’re gonna want all the buff slots for Lingering Blossom (ATK/SUR/EVA). Can we talk about how this is the best of all these “Aggro” skills? This makes Savia’s and Aldric’s look even more whack! She just needs to get hit; it doesn’t matter if the hit can’t be countered, and it has built-in protection from taking more damage than she can handle. Getting the buffs even if you don’t “persevere” is crazy compared to what happens if Savia/Aldric don’t get targeted during theirs.

    The basic idea is that you use Lingering Blossom to get the buffs and into critical HP to follow up with Ephemeral Illusion to one-shot anything that isn’t a current endgame superboss. This skill is incredibly strong and would futureproof the unit by itself, but then they gave it skill lvls so that it can never fall off (So long as you’re down to codex it)! Oh, and an ATK/SUR discipline because they gotta make extra sure she’s strong!

    A boss killing Legendary is a new idea, and the trade-off is that she’s a weak auto-battler…in a game where 80% of the play time is farming! Looking at how Abyss 3 is structured, with dedicated farming caves for specific kinds of gear and several optional post-Gatekeeper superbosses, and how this unit functions as a specialized boss killer, I think the direction the game is heading is clear. If I am right, the idea being that we are to grind specialized gear to take down the increasingly demanding, optional superbosses, then this unit could be a Sheli-tier MUST PULL for low-spend accounts…assuming you’re down to put in the work grinding for Samurai katanas. Unlike with Rinne/Kiriha’s dual release, Bugen is not a solid budget replacement for Shiou. I am evaluating Shiou separately from the Samurai class here.

??? info "Karkarov's Analysis"

    "At long last the Samurai Class is revealed with a new Legendary to boot!  But does it suck?  No.  However if there are two words to sum up this character and maybe the Samurai class on the whole they would be ""It's complicated"".

    Shiou though her unique skill Lingering Blossom gains an attack power and surety buff for 3 rounds, with 1 round of inceased aggro.  If in that round she is attacked, and dropped to 0 HP, she may ""persevere"" and tank the hit gaining a stronger attack, surety, and now evasion buff as well for 4 rounds not 3.  The surety buff after persevering is also so strong it all but guarantees every hit while the buff is up will proc surety.  Combine this with her once per combat unique uninheritable skill Ephemeral Illusion Stance that can only be used when below 30% HP and well... You get a character that can do damage on par with Full Power Strike level 3 from a well geared fighter with strong stats and some reasonable skill inherits.  Except she herself can get to that damage while wearing ""ok but not great"" gear, has decent but not impressive stats, and has no skill inheritance or discipline levels at all.

    TIME TO OPEN OUR WALLETS BOYS!  Hey, hold up now, I said ""It's complicated"" right?

    Samurai as a class has a stance dancing system that requires different stance moves to be performed to really get her set with her best possible attack buffs.  This is beyond needing to prep with her inherit skill Lingering Blossom AND be below 30% HP to use Ephemeral Illusion.  This of course assumes you do Lingering Blossom, do get hit, do get knocked to what would be zero HP, and persevere it to get the max buff too.  There is a lot that can just not work out in the process of setting up ""the moment"" to unload with some insane 4-5k+ damage bomb (or maybe even 9k plus if you are a whale).  Fortunately even if it does go wrong you can also just Bamboo Splitter to win (a default Samurai Skill) that already does near Full Power Strike damage, but does not need a ""charge"" round, only a round to set up a stance first.  

    You also need to consider that Samurai gains extra damage from their Magic Attack Power stat as well thanks to the Divine Path default skill, which sounds great, except they also gain less damage from normal Attack Power than say a Fighter.  In fact on many attacks without special set up or prep Shiou with a similar Attack Power to a Fighter, despite also having Magic Attack Power support, will probably do slightly less damage.  Again, without some stance work and proper set up.  This means gearing a Samurai has more options (both plus Attack AND Magic Attack are viable) but it also means they get less bang for buck from those stats.  For Shiou at least this is offset by her Lingering Blossom skill which enables her to worry a little less about Surety than someone without this skill would.

    Ok great but what else is there to consider? Well Samurai by default have skills to let them buff their weapon with different elements, enabling them to target all elemental weaknesses except Light and Dark. Her Discipline greatly boosted traits are Attack Power and Surety, can't beat that.  She by default has fantastic traits for the class especially if you pull a copy with a Strength boosted to 13 due to high default IQ, Dex, and Speed.  Her Neutral alignment gives her access to the most alignment based buffs. Her Wind element (at least at the time of writing) is not often exploited by enemies in the current high level content, outside of a few easy to kill normal mobs.  The only glaring disadvantages are the class and skill set up complexity, needing a Katana which is very limited on her release (7/10/25), and being an advanced class that needs over 10mil exp to reach 60.

    TLDR?  Shiou (and Samurai as a class) has a very real learning curve, needs a lot of set up, but when set up correctly has the potential to be the best DPS in the game.  So again, ""it's complicated"", but also very worth it."									

??? info "Shiro's Analysis"

    Starting from inheritance it’s working great on Shiou, Galbados or Savia. But I wouldn’t personally recommend going crazy over it and let your priests do the buffs in a team. It’s good for a niche and surely works well with Will to Fight and Back-against-the-Water Formation but as for now we don’t have a lot of options to use it with well and we might need to wait for GUTS focused class for better performance.

    Moving to her passive… it’s actually active this time. And hella strong one. Not only can it be leveled with books it hits like a goddam truck leaving all the damaging options in the forest. With good SPD and porto it’s also pretty much instant ability. And best of all? It bypasses defense. Now. How strong is it? Strong enough to kill anything including superboss on lvl 7 in single or almost single hit. The only issue? She needs to be under 30% HP which can be without issues solved by speed tuning her so there’s no actual risk to it.

    Moving on discipline. Devs went completely with the idea “let’s make her as broken as possible” and they gave her Gerulf discipline. I don’t need to say much more there.

    As for class change she doesn’t have any. But she’ll benefit from either fighter/knight/thief for different purposes. One will push her dmg, another will let her play more on low HP and last one will push her surety damage (let’s pray she won’t become mage or priest for w/e reason).

    To sum it up. Shiou belongs to a new class - samurai which is simple as a stick. You’re either using a counter or spamming bamboo splitter without need to think. If you drop for low HP buff then great, It’s not needed though. DTS from my experience is bad on samurai compared to fighters with axes (lvl 3 samurai DTS was hitting as much as lvl 1 DTS on fighter) so it’s easy skip for a skill in kit. Her elemental buffs are good but first you need to have a long enough fight and boss on which elemental advantage works. Which leaves us with basically 2 choices. Counter or Bamboo - better FPS. Which means we’re left with a simple unga bunga class. The only thing with Shiou that needs a bit of thinking is setting up her nuke which you can drop with poison traps or just wait for it to occur naturally in a fight and punish the boss for what he shouldn’t do - fighting back. Oh, also thanks to being wind beastfolk she have great stat setup with good speed. Because why not?

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    I pulled 4 copies so far. One copy went to the OCD Discipline, and the others took her Lingering Blossom up to level 3. I might pull more later, too, but we'll see!

??? note "Karkarov's Pull Plan"
    "This one is tough.  Shiou has an extremely high potential value ceiling, but is very complicated to use correctly, and has a lot of risk required to activate her true damage potential.  If the game slogan ""Savor the Risk"" where a character, it would be Shiou.  This may be a little too high effort for some, and is certainly harder to impliment in your team than a Fighter or Ninja.  So, here is what I think:

    If you are at a point where you just dont want another melee DPS, or you are just starting out and can't support the EXP / Katana investment the character needs, or maybe you just don't want to think a ton while playing.... You should probably pass on Shiou.

    If you are a person that doesn't really do much auto farming, likes more engagement with their characters and party strat, loves risk based classes and gameplay in RPG's, and just want an absolute DPS beast on your team extra effort be damned.... Shiou is a highly reccomended pull for you.  Very highly recommended."									

## Duplicate Usage

* Inherit on her own skill will increase her self-buff.
* Increasing her Discipline to increase her Surety.
