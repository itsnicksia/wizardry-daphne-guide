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

    So, many days and many moonns have passed since Shiou's original reveal, and how she has once again returned to the banners!!!  However A LOT has changed since her original release, so it is time to completely rewrite this analysis as of 11/29/25.

    So originally there was a theme of how Shiou was complicated, while this remains true it is really for different reasons.  Her Ephemeral Strike skill remains possibly the highest damage skill in the game at level 1... but it is also so complex and risky to use because it requires her to be below 30% hp and have speed buffs/speed tuned caster support that frankly... you should neve even attempt to use this skill in any meaningful fight.  If you are some no lifter with a 200+ speed caster with tons of alice inherits and know exactly what you are doing go for it, but I don't write reviews for the 1%.  Long term this skill has really turned out to be a lot of sound and fury signifying nothing.  If you naturally end up in a 30% hp scenario to use it, great, just don't try to force it.

    So where is the complexity coming from then?  Well it is the elephant in the room, unlike when Shiou was originally introduced there is no longer any event making it easy to get a katana.  A new player today will basically find themselves with only three choices for getting a weapon for her.  Spend to get a Kiku Ichimonji (lucky purple bone pull or 100 points), go farm sand shadow cave for weeks (you do have it unlocked right?), or wait for abyss 4 and pray ninja/samurai weapons are not rare drops in there like they are in the other 3 abyss.  To add insult Samurai is also the hardest to gear class in general.  You want to avoid percentage bonuses because by nature of the class they only get 60-65% of their attack power and magic power to begin with.  So a line of +20% attack power is actually a line of  +12-13% attack power.  So you have to stack Attack Power, Magic Attack Power, avoid %, still get some Evasion, still get some Surety, don't forget Accuracy, and still get Action Speed.  Meanwhile every other DPS class can use % attack power, and just stack Attack.  These best part is after you gear this Sam... the gear is basically Sam only the second you class change you want to swap it all out.

    So to make it clear, hard to gear, +needs a gacha weapon or a abyss 3 farm spot for katana, gear is class specific due to stats needed, and they have high exp requirements due to being an advanced class.  This cocktail produces a fine Whiskey called "Stay the hell away if you are a new player".

    Bamboo Splitter remains great DPS.  Too bad the only way to level it is EXP scrolls, and to use it you still have to enter Cresting Wave Stance first which increases the damage you take by 25%.  This means to Bamboo (and you want to Bamboo) Shiou has to put herself in easy 1 shot range even at higher discipline for any fight with large mob numbers, enemies that just use magic, or any hard hitting physical enemy she doesn't have a Quickdraw Stance ready for.  A recent funny image I saw was someone saying "Killed Sealed Greater Demon, and Shiou never died!" and if you looked at Shiou's fort it was in the teens showing she clearly died, a lot.  Everyone else was at 100 or at the least well over 50.

    That said Quickdraw is still super powerful as long as you are fighting either small enemy groups who never use magic, or one super hard hitting enemy who can only attack physically like a Cyclops.  This is really the only kind of fight Shiou actually excels in these days, which means yes, she is effectively now a niche character designed to lure in big hits from physical attackers so she can quick draw counter.

    Well she still does more damage than a fighter bro!!!  Yeah in the above two scenarios where you get Bamboo going without her dying, or it's just a counter fest niche fight, she does.  But if you don't get Bamboo going safely?  If the fight is not a counter fest?  Then no, she isn't doing more damage than a fighter, in fact she will do less.  The two hand changes also made her damage advantage from the past far smaller than it was on her release as well.  So even when she does get going, she is no longer clearly in the lead, just slightly better at a cost of far more risk, weird gearing, and way higher exp needs.

    But she now has Fighter as a class change, she must be meta, SHE BREAKS THE SPINE OF THE GAME BALANCE!!!!! Yeah absolutely not, Fighter was actually a bad class change for her.  Every skill she needed from Fighter was already inheritable through multiple sources.  Effectively all she gained was a guaranteed level of Way of the Warrior (you really only need 1), a free level of Follow Up Attack, and a free level of Counter Attack (PS: Counter Attack can't proc when you are in Quickdraw stance).  You can swap her to fighter and start using her that way, but again, the Gear won't carry over, she will need completely different gear for each class.  Also Samurai likewise brings nothing to Fighter.  Quickdraw, Bamboo, even Cresting Wave are all Samurai only and you can already inherit Bugen's for Decisive Torso Strike on a fighter if you want to.... but DTS is already just Heavy Attack with sprinkles.  They are really the same skill just one costs a little less SP and does less damage, and the other costs more SP and does a little more damage.

    In short, there is no synergy between Fighter and Samurai and everything she needed from Fighter was already obtainable.

    She still has Lingering Blossom though right?  Yes she does. Had she gotten Knight as her class change this would have been huge synergy and made her the games greatest "tank" maybe.  Too bad she got Fighter.  As a fighter this skill is just not really useful unless you need a defensive move to buy time for a healer to get a turn.  As samurai it is still mostly useful for setting up Ephemeral... and that just isn't worth the complexity or risk to be honest.

    Before it was time to think about opening your wallets boys... but with the two hand changes, the increasingly more common large mob number fights, super bosses more reliant on magic and status effects than physical... You should not open your wallet.  Keep it closed and wait.  Maybe with the 60-70 changes something will happen to bring Samurai back into the limelight.

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
    Sadly as of this rewrite on 11/29/25, this one is no longer tough.  With the two hand changes even when Shiou gets going her damage lead is no longer significant.  Certainly not enough to justify the 25% damage increase she will have to carry to get Bamboo Spamming.  She still has great niche value for man handling Cyclops's or other single attack physical attackers with no friends... but I am not going to advise anyone pull over a niche.  Samurai requires too much exp, too much Samurai specific gearing, and does not have the damage lead it used to anymore.  Just get another two hand axe Fighter.  Easier to level, easier to gear, less risky to use (even Gillion is less risky), and easily available.

    Maybe things will change with the 60-70 levels, but at this point I have to write this based on the now.  Right now Samurai is not in a great place, and Shiou swapped to fighter is just ... a beastfolk Fighter with nothing special to seperate her from any other Fighter.

## Duplicate Usage

* Inherit on her own skill will increase her self-buff.
* Increasing her Discipline to increase her Surety.
