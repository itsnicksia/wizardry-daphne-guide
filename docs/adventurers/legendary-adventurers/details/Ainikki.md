---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Ainikki

# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-class-personal-request.jpg
#
# Free text can still be added to any section in the relevant text block but
# skill text still needs to be indented 8 spaces.
#
# Reviews can be added at end be removing comments around relevant sections
# in free text block.  To not remove any block tags.  

# set debug parameter to true to save full markdown before HTML build
# in a {project_dir}/debug_output folder (if that folder exists)
   debug_render: false  

---
  
{% extends "Adventurer_parent.md" %}   
     
{% block InheritFreetext %}
{% endblock InheritFreetext %} 

{% block AltInheritFreetext %}
{% endblock AltInheritFreetext %}
     
{% block PotentialInheritFreetext %}
{% endblock PotentialInheritFreetext %}

{% block UniqueSkillFreetext %}
{% endblock UniqueSkillFreetext %}

{% block AltUniqueSkillFreetext %}
{% endblock AltUniqueSkillFreetext %}

{% block DisciplineFreetext %}
{% endblock DisciplineFreetext %}

{% block AltDisciplineFreetext %}
{% endblock AltDisciplineFreetext %}

{% block ReviewsAndAnalysis %}

## Adventurer Reviews

??? info "TheAxolotl's Analysis"

    As our latest collab adventurer Ainikki has an interesting hybrid kit that, if I were a betting man, would say teases what the Lord class will eventually look like - some combination of Knight + Priest, emphasizing a combination of defensive/support abilities while simultaneously having Div contribute towards Attack Power, similar to how the Samurai utilizes both Attack and Magic Power. Time will tell for sure, but enough about that - let's talk about her kit!

    First, let's touch on her passive skill, Priest Overseeing Life and Death. This works similarly to how Iarumas works, increasing Attack and Defense while in the front row, and Div and MDef while in the back row. It also allows Divine Power to contribute to Attack Power when equipping a 1h mace. I personally haven't tested this out yet, but in theory, this would allow you to build a front line priest with a heavy Div focus and have 1h mace do better-than-garbage damage. That being said, this component of the passive doesn't mesh quite as well with the rest of her kit.

    Her inheritable active spell, LITOKAN, deals moderate row-range fire damage based on Divine Power, not Magic Power. It also inflicts a fire resistance down debuff, which could get annoying to deal with when it comes to the 3 debuff limit, especially since there really aren't many, if any, folks running around with fire-heavy teams. I'm not entirely sure how the damage works on this one, but in general, Moderate damage is generally fairly respectable for a caster, however spell scaling in general is not that great.

    She also has a second signature, non-inheritable spell, and this is where her kit really starts to interest me. MAPORFIC is a row-level buff that shares a slot with Knight's Defense, which means it does not conflict with the 3 buff limit. Early testing points to this buff reducing damage dealt to the row by approximately 15% and lasts innately for 8 turns. This means if you have her first two turns be to cast MAPORFIC on both rows, Ainikki can provide a party-wide 15% damage reduction for the entire duration of most battles. The downside to this? Well, MAPORFIC costs 40 mp to cast. Luckily, this is reduced by Way of the Priest, which...she does not get by default. A single inherit, though, will take the cost from 40 mp down to 36 mp, which is quite noteworthy.

    The other thing I really like about her kit is that she gets access to MAKALKI. If you've ever talked to me in Discord, you'll know how much I love this spell. As of now, this makes her the only adventurer that can provide row-wide ailment immunity while simultaneously providing row-wide damage reduction (remember, both MAKALKI and KD are class-specific abilities). She also gets Recovery, which is definitely one of the better Knight passives out there.

    The other thing I'll touch on with her kit is her offensive abilities. She gets access to Guardian Blow and Fortified Strike, which are relatively underused and expensive skills, however they enable a unique way to build Ainikki. By focusing her blessings on ASPD, Divine Power, Surety, and MDef/Def, she can be in a unique spot where she could use SP to contribute offensively and MP to contribute defensively to a fight, while picking up gear that up until now would largely be tossed out as useless. To top this off, she's able to wear Heavy Armor, which already has a lot of base Defense to fuel those Guardian Blows and Fort Strikes. This is in no way a meta build, but it's definitely a unique one, and it's something I'm excited to play around with.

    Also, she does get access to 2h swords, but that really doesn't mesh well with the rest of her kit.

    All in all, I actually really like what I'm seeing here. If Ainikki really is the teaser to Lord the way Iarumas was the teaser to Samurai, her kit makes me very excited for what Lord will bring, and I actually like her kit as it is - the combination of MAPORFIC and MAKALKI alone is exciting to me. That being said, many folks will struggle to find a place for her on their team, especially if they're already running Alice and/or a Knight.

??? info "Karkarov's Analysis"

    Well other than Garbage Ainikki seems to be the character everyone wanted the most for the new Blade and Bastard Collab, so how is she?  Is she the "actually a Lord class 2 hand sword DPS god who also does everything a priest can" people were predicting?  No.  Not at all.  So what is she really?  Well lets get into it.

    First off like all other collab characters she has a unique class, in this case it is "Silver-Haired Nun" and there is your first big clue.  Ainikki is mostly just a Priest.  Gear wise she has some interesting additions.  Namely she can in fact use one and two handed swords, can use heavy shields, and can use heavy armor.  Beyond that she has the standard Priest Class gear options.  So this means she can be tankier than other priests (not that normal priests aren't already tanky) and has more options if you really want to use her as front row DPS.... but you absolutely should not do that.  Why?

    So As the gear suggests Ainikki has dipped her tows outside Priest in her unique class, but which class did she dip into?  Well it wasn't Fighter or Samurai, it was Knight.  This creates a big problem for her on the front row, she can hang there and surive for sure (honestly any correctly set up Priest can) but like Priests despite the razzle dazzle she does not bring any meaningful DPS which means you are losing a better DPS option such as Fighter, Samurai, dagger Ranger, or even a plain old front row Knight to run her there.  Like Priest she is really meant to be in the back row as a support.  This is made evident by her unique skills and what exactly she brought from Knight...

    From Knight she gets ... Stun Bash, this is not a DPS skill it is meant to be used on enemies weak to Stun.  Self Healing, again more of a sort of tanky self support sustain skill.  Fortified Strike.... a bad DPS move based only on your defense stat.  Lastly from active skills it is Guardian Blow, the best Knight DPS move yes but it's damage is based on defense and magic defense and requires you to equip a heavy shield to use it.  The only Knight passive she learns is also Recovery which only helps you get over status effects.  So yeah, there went your two hand sword DPS queen dreams Ainikki gooners.  Her own unique passive "Priest Overseeing Life and Death" does give her divine power added to attack power... but only when using one handed maces.  Which if you ever look at her character art or any of the Manga pages that aren't memes Ainikki's go to was always a spiked one hand mace.  This makes sense and fits the character, but also means if you want to use her as front line DPS she will be totally reliant on very robust skill inheriting as she has no DPS passives (in fact only 3 passives total and the other one just boosts Div Power on ambush) and no actual DPS attack skills that aren't based on defense stats.

    But what about her discipline surely it is god tier!  Not really, she gets attack power, which for reasons already outlined above has no synergy with her base skill set, and divine power.  It isn't god awful but action speed or especially MP would have been a lot better than attack power for her.  So this is a big shrug of a discipline that doesn't really do anything impressive or help any weakness she may have.

    What about the priest side.... well here is where things look up.  If you look at Ainikki's skills it is obvious she is a support caster.  Her unique non inheritable skill is actually one of, if not the, best defensive spell in the game.  It is Maporific an 8 turn damage taken down buff for 1 party line that reduces damage taken by 15%.  It does have some problems... first it does not stack with Knights Defense.  It is a one or the other situation, longer duration but lower damage reduction or barely any duration but crazy high damage reduction.  So situationally KD will be better, but in general Maporific is the better choice.  What's the other drawback?  It costs 40 freaking MP.  That's right, 80 MP to put it on your whole team for one fight.  Meanwhile Ainikki is MP'd like a Priest, not a MAge, so even at 70 this is a huge percentage of her casting reserves.

    Her other unique spell which is inheritable is Litokan, a line aoe fire element spell that claims it does moderate damage based on divine power and may reduce enemy resistance to fire damage by 10% based on divine power for chance proc.  In reality this should read does dog water damage where you will probably need level 2 or 3 at level 70 to do damage on par with a level 1 mage Mahalito.  (ok it isn't that bad really, but this spell has no DPS to it, it does not do much damage).  This is pretty much only useful as a "I am running a fire team using fire element weapons and attacks lets hope to get lucky and debuff the enemies to buff my teams damage" spell.  So it is basically a pure team comp gimmick skill.  So I can't say this skill is really all that "hot".  cwutIdidthar dad jokes and puns lol

    Ainikki has also lost a few Priest spells like Badios for example but who cares?  The key skills are all there.  Makalki, Abit, Dios/Madios, etc etc.  What is not there, just as mention before, is passives.  She only has 3 passives not counting her discipline, and they are not great ones.  To be a good support caster for real she will still need inherits, just not as bad as it would be for a DPS role where she has to start from all but scratch.  At minimum she REALLY needs way of the priest and some passives to boost her MP desperately.

    In closing she is a good alignment elf lady of fire element.  That about sums up the issue, fire element isn't good for casters, elf lady is better for mage than priest, good alignment doesn't play well with Alice buff and you do want Ainikki on the back row.  There just isn't much synergy on this character.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"

    I'm going to probably pull a few copies of her - I want to experiment with the MAKALKI + MAPORFIC combination.

??? note "Karkarov's Pull Plan"
       
    I ended up with 2 copies because she is actually in all versions of the B&B Collab bones, but to be real, I was only pulling to get an Alt Berkanan Costume.  My advice is hard pass on this character unless you are a huge B&B fan or just goon for Ainikki.  If her inherit were Maporific and not Litokan that story might be different, but it isn't.  Gandolfo with fighter / priest Alt class can do anything you would ever want to do with Ainikki other than cast Maporific and he is just one example.  He just doesn't cost gems or real world money and is a whole lot easier to discipline.  Like Maporific is a great spell, but it is being gated behind a character that brings nothing to the table other than that one spell.

{% endblock ReviewsAndAnalysis %}
