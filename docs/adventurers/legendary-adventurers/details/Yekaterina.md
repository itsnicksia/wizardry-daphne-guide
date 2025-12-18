---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.

   title: Yekaterina
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
{%if chardata['Secondary Class'] %}**Class Change**: {{ chardata['Secondary Class'] }}{% endif %}  
{%if chardata['Alternate Style'] %}**Alternate Style**: {{ chardata['Alternate Style'] }}{% endif %}  


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

    === "Standard"

        Yeka, like Adam, is one of our initial mages. While she will be impacted by unfavorable type matchups, she innately provides both Earth and Water damage. In addition, she can learn Fire and Air damage through inheriting spells. This, along with her bonus damage to undead, makes her a very heavy hitting for the beginning abyss and the trade waterways. Her MP reservoir is not as deep as Adam's, but she trades the longevity for hitting harder.

        Her ambush prevention skill is also nothing to shrug off. Some people report that they don't get much value out of it, however I've personally seen roughly half of the ambushes I've had pop up be prevented, and that's pretty great. To make things even better for Yeka, she's a Neutral alignment which has the potential to make her a bit more future-proof than Adam when it comes to team formation. Lastly, if you inherit Adam's skill on her, she'll be able to get the have damage dampening, which will likely be useful, particularly when you're not sure what an enemy's weakness is. In addition that, her Neutral personality has the potential to make her more flexible for team compositions, but this may or may not be the case long-term, since we don't know what future releases will look like.

        Changing her class to Priest will give him a wider selection of spells, as well, making her a very well-rounded Adventurer for support or damage purposes.

        One big downside to Yeka is that her Discipline levels do not boost her Magic Power and Action Speed the way Adam's do, however it's very likely that having her Skill/Spell-Bind tolerance boosted will be quite useful in the future.

        Yeka is a boon to have on any team and due to the ability to hit multiple weaknesses, deal increased damage against undead, and prevent ambushes. She'll likely be a staple in many peoples' party, but recent additions like Shelirionach make her much less desirable than she once was.

        She still is excellent for being accompanied by Doctor, the best drinking buddy anyone can ever have.

    === "Everdistant Summershade"

        As our third legendary adventurer to get a second form, Yeka's is pretty much a textbook sidegrade from a mechanics perspective.
        
        Looking at her non-inheritable skill first, Yeka loses her bonus damage to undead, and gains more HP and damage reduction in the back row. This makes her more survivable while dealing less situational damage, however there's a big question of whether or not she needs that extra survivability. As a human, her HP is already higher than that of an Elf mage/priest, and being in the back row, she already has pretty decent survivability. More is better, but it's in no way necessary.

        On the subject of her Discipline, Yeka gains more HP but loses her Bind tolerance - again, trading something situational for something more general.

        Neither of these changes are bad, but they're also not groundbreakingly good. Her summer form is a bit more general-purpose, while her standard form has a bit more situational utility. I'd lean her summer form being maybe a hair better than her standard form, but overall nothing worth going out of your way to get.

        From a visual perspective, this is of course going to be subjective, but I'm pretty sure many people are going to pull for her legs alone.

??? info "Frobro's Analysis"

    === "Standard"
        
        Likely the single most overrated unit by the playerbase, Yekaterina. Don’t misunderstand, she is perfectly serviceable and better than many other mages, but not anywhere near as potent as people would have you believe. Not sniffing the top 3 mages…maybe not the top 5 either.

        She is positioned in a pretty good spot early game. Bonus damage to the undead at the bottom of Abyss 1 and bonus damage to Earth-weak enemies in Abyss 2 while resisting those enemy's attacks too. But that bonus damage isn’t anything crazy like 2x so it isn’t as valuable as it may sound initially. The further the game goes on the less important this early game advantage looks, even now, Shelirionach outperforms her at those stages of the game.

        Her Eye of Kalsum passive is whatever. Ideally, you don’t get ambushed ever; which you can avoid with high Detect and not strafing into enemies. I suppose it becomes a little more valuable to someone who regularly uses Morgus contracts which have a set increase to ambush chance, but even then the proc rate feels so low that it may as well not be there. Maybe it’s incredibly consistent at higher levels, but I have heard no reports of this. Her discipline focus is…something. MP + Skill/Spell-bind. It’s not exceptionally good but it’s not bad. Dark/Water Elves get more MP without needing dupes and spell-binding enemies aren’t exactly common.

        Early access to an attack all spell with Secrets of Maerlik is cool, but she doesn’t have the MP to use it often until around the time she naturally learns Maerlik anyway. But being able to cast the ~15% stronger version is cool.

        Overall, better than the riff-raff but faces some serious competition from other units that can easily outdo her with easier access to merges or access to other team synergies and utility. (Elf-Mag, Milana, Iarumas,etc)


    === "Everdistant Summershade"

        I believe most people look at this one and say “side-grade”, but ignoring the difficulty of getting merges for the discipline, I believe that this is technically better, even if it’s not flashy.

        HP + MP is preferable over Omni-bind tolerance + MP. Since most enemies don’t have the means to bind you at all and most fights don’t last long enough for enemies who can bind to land it on you, it feels like a wasted discipline focus. On the other hand, while MP isn’t a bad focus stat, it really only keeps her MP relative to the elven casters who trade lower HP totals for higher MP and Mag Power naturally and also have some form of MP conservation/regen (Adam/Shelirionach) or dmg buff (Alice/Milana/Flut/Chadam) on top of that. The same elves that can patch up their low HP pools by increasing discipline levels…The design space for non-elf mages is so bland

        A tankier mage that’s less reliant on RNG-based mitigation than Adam and Sheli. Trades her 4/10 anti-undead passive for a 5/10 phys resist and small HP boost. Yekaterina is fighting for her life for 5th place! Still overrated out of 10.

??? info "Karkarov's Analysis"

    === "Everdistant Summershade"

        Well this is interesting.

        One one hand she really isn't very different from normal Yeka.  Her Discipline seems a little weaker than normal Yeka with the loss of bonus Skill Bind Resist in exchange for more HP.  On paper losing Undead Bonus Damage and Defense also seems important but I would argue this was a marginal bonus at best considering as a pure caster she never posted ""huge"" numbers to begin with and Undead are traditionally low HP Enemies.  Her new skill being +HP and Defense when in the back row while not super impressive has a big advantage though.... it is simply always useful.  The Undead skill has no value if you aren't fighting undead, and if we are being honest they are not one of the most common enemy types plus are fairly easy to kill with magic regardless.  Mages can also always use more survivability, especially at low discipline levels.

        In short it is ""marginally useful skill sometimes"" versus ""marginally useful skill all the time"".  I think the new skill with HP and Defense wins in this case.

        In the end she does everything Yeka always did minus some damage to Undead which seems to not be super high value to me when you consider how easily any mage can wipe an undead pack to begin with.  Losing the bind resistance is honestly the biggest issue to me, but that is also sort of marginal and can always be healed anyway.  Your casters should always carry 1 scroll of unbinding... just in case.  Also I have to be honest, I really like the costume design and think this is a really cool looking version of Yeka with a great vibe.

        I am going to say I rate her slightly above (VERY SLIGHTLY) normal Yeka, but her long term value will be directly tied to the upcoming character merge changes Drecom makes.  If those changes are lack luster what I affectionately call Summer Yeka will be kinda lack luster (from a meta viewpoint) as well.

??? info "Shiro's Analysis"

    === "Standard"

        Along with other, standard banner characters, she has a really strong inheritance, not as good as Alice, Debra, Adam or Lana, but despite it, still a good one QoL. Also unlike Lana’s you can stack it all over your team so unless you don’t like Yeka really much she’ll be mostly food for lvl 6 on every of your character that you use.

        Moving to her passive - it’s boost vs undead. Nice in the first abyss 7th floor and in third for early floors or catacombs. It’s niche at best.

        Moving to her discipline - MP is valuable because Yeka suffers from mana issues. But outside of the resistance to spell bind have low value because we don’t have gear to build immunity to it.

        As for class change. It’s a priest. And honestly? I’d personally run her as a priest if anything. If you don’t use mages as a damage dealer but support, then Yeka value skyrockets. Still she doesn’t bring anything as crazy as Alice, Sheli or Madam but she’s definitely a solid option.

        To sum it up Yeka is the worst legendary mage with a really bad setup (earth+human) which gives her only survivability. But if Alice as mage can survive multiple 0C GWO roars then I don’t see a value in Yeka having more bulky HP. She’s losing hard to best casters like Alice and Sheli, or slightly worse ones like Adam/Miliana/Flut/Iarumas fighting for life with Dino/Elf-Mag or Emil. But she’s still great for the early part of the game where her buff actually matters on first abyss or in second where she’s earth element. Sadly unless we won’t get purely undead abyss then she won’t see the light. And even if we do then Raffaello with an anti-undead 2h hammer will perform better there.

    === "Everdistant Summershade"

        I’m genuinely confused with what devs tried to cook there. She gets more HP which is already completely unnecessary for mages. On top of that physical DMG resistance? For what? Neither 0C GWO or Necrocore can kill Alice or Sheli as mage with way less HP using their physical attacks. So unless we won’t get strong physical backrow damage in A4 then it’s kind of pointless.. 

        But hey her discipline gives even more… HP. Yeah. Better than base one but unless Yeka won’t get HP scaling skill then I don’t see a point. But hey! Maybe devs really want to make Yeka a MADI focused damage dealer? Because I don’t get it at all. Maybe I miss the future vision where mages get HP scaling skills. Overall worth to get if you use Yeka for merge… or get it and her gacha gear and go for MADI build?

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    Everdistant Summershade Yeka is quite pretty, so maybe I'll pull to get a single copy for that reason alone. Possibly a second for the obligatory OCD Discipline, but I'll likely just wait to see what I get from the free bones first. Her summer form definitely isn't enough to make her a regular addition to my party.

??? note "Karkarov's Pull Plan"
    She sure is cute in her new fancy mourning dress, I can tell why her Hubby liked her so much.  Style and class all the way, and Doctor clearly agrees the clingy bum.  That said, ultimately this is just a slightly better version of normal Yekatarina, so I can't call this anything even close to a must pull.  If you like the outfit, like Yeka in general, or don't have a Yeka at all, I can't fault you for doing a few pulls.  I did.

    I would not suggest pulling past the 100 pity though unless you are a serious Yeka addict or a whale.  I am not sure I would even advise going for more than one copy.  She is at the end of the day no competition for Sheli from a meta perspective, and not doing anything normal bone pull Yeka can't do.  If she were only available in banners and not in the normal pulls I would honestly rate her a bit higher in priority, but she is available in the normal pulls.

## Duplicate Usage

* Discipline or skill inherit. This one is tough to determine since we can't see the impact of her anti-ambush skill on the character sheet. You can't go wrong with either option.
* Inherit her skill to the MC. Again, hard to evaluate because we can't see the impact and reduction of the anti-ambush skill on the MC.
