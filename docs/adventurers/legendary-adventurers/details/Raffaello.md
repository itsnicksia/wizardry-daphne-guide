---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: CHARACTERNAME

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

    Here's what's great about Raffaello being released right now. He's a great adventurer to skip in order to save for whatever we get in the anniversary! With that out of the way, let's dig into his kit a bit.

    First, we'll talk about his Bones of Obsessive Love passive. This is pretty lackluster. Yes, he restores MP when he kills something (2 MP, I believe). No, this is not inheritable. No, priests won't often have the turns available to deal damage. No, even when it happens, priests won't often be the ones to land the kill. I love MP restoration, but I can't imagine he'd be landing enough kills to make it worthwhile. One important thing to note is that even though his signature spell deals damage to a row, if you kill more than 1 enemy with that spell, he only gets a restoration amount equal to one enemy. There also seems to be a bug where his spell is the only thing that triggers this restoration. That will likely get fixed, but still - not great.

    Now, let's talk about his Alchemized Anima Dissolution spell. This is weird. First, it's a combination of a MA damaging spell a MA healing spell, where the damage can be targeted against either row, but the heal is only for the front row, regardless of position. This isn't that bad since the front row is likely what's needing healing the most. Early tests seem to indicate that at skill level 1, when he uses it, the heal is somewhere around 40% of the damage dealt and the damage is roughly 10 damage per PIE, while it gets used by someone else through inherit, the heal is closer to 15%, with roughly 6-7 damage per PIE. The fact that this is PIE-based is the strange part, since there's nothing we can currently do with gear to improve it. It's literally as static of a heal as possible, however it has a comparatively high MP cost. The one benefit of having it be locked to PIE is that he's not reliant on Divine Power to heal. This would let you effectively build him as a battle priest.

    His Discipline is also weird in that it's the first Discipline we've seen that boosts a Trait (Piety) instead of a stat. Unfortunately, Piety is up there with Vitality as a very underwhelming Trait to boost.

    Keeping this short for now, and I might add more later. I love the idea of his kit. I think it's really fun and would be a welcome addition, however the implementation of it is what is strange. A priest isn't going to be able to do too much with this due to having better things to spend their turns on, and having the damage+heal locked to Piety is a bizarre choice. Even if you wanted to run a damage priest, the MC or Abenius could fit that bill easier. The one saving grace I could see is that you could literally gear him out as a DPS, complete with damage-oriented skill inherits, and his healing won't be negatively impacted. He could actually make a decent battle priest, however there are much better ways across the board to provide better damage and utility.

??? info "Frobro's Analysis"

    Another awesome design from the art team, let’s see how the devs waste it. 

    MP Regen Passive. Now that’s a start! Only after a kill. There it is… What is the idea here? A Marianne-style MP cost reduction is more effective than this. Are we supposed to put him in the front row to try and last hit scrubs with a staff/mace for…checks notes…4MP? I’m speechless.

    Well, at least they gave him a button to click that isn’t Badios in Alchemized Anima Dissolution. 20MP for a row target spell + front line healing is probably a fair deal, but I’m struggling to see when I’d ever want that. Seriously, can someone point me to the exact enemy formation I’d want this for? On top of that, for some reason, they scaled it off Piety; which basically keeps it’s potency capped at around whatever his current level is. I assume you’re better off leveling the spell up to do more damage to get around potential softcaps than doing that anyway.

    Which brings me to the final point; the MP/Piety discipline focus. All this does is mentally prepare us for the day we get a unit that has a Luck discipline. I always hoped any lich/necromancer type guy we’d get would be something really cool, like having a spell that resurrects non-reversed fallen allies that turn them into uncontrollable units that spam the undead enemy-only skills for 0sp. Instead, we get a normal priest with an expensive AOE life drain spell.

??? info "Karkarov's Analysis"

    Raffalmao to his credit is one of the coolest charater designs drecom has done to date, it might even be my favorite.  I guess I covered the good...

    So there is a lot to unpack here. An untyped aoe line attack spell for priest, sweet!  It even heals for give or take 15-17% of damage dealt to the front line of your party.  Cool!  It's damage scales off of... Piety.  WAT?  Not Magic Attack, not even Divine Power, your literal Piety trait/stat.  Well there went any hope of this spell being great DPS, but you know priest's don't have a line attack at all and inheriting line mage spells is costly and not always easy right?  What's that MP cost?  Level 1 Spell, does a little less than mahalito level 1, heals maybe almost madios 1 to front line.... 20 @$@!%&*# MP?
    
    Suffice to say this was a good idea on drecom's part, I like where they were going with it.  But damage and healing are a bit too weak to justify that MP cost, and when compared to say 20 MP level 1 Tzalik a spell that could reach 2k surety hits, doing like 400 line damage and healing for 150ish doesn't seem to be as good for the same casting cost.

    But WAIT!  Raffalcopter has an MP Regen skill!  We are saved!  Huh... only regens 2 #$@%$#@! MP on kill?  Even if you kill multiple enemies it's still only 2 MP?  Insult to injury, because this is the unique uninheritable skill you can't even level it to maybe get uh.... 4 MP?  Both Shelirionach and Marianne have better MP management skills for Priest casting.  This skill is simply lack luster and does not recover enough MP on it's own.  The fact that it requires a kill also makes it unreliable.  Oh, and don't forget, it has to be a kill via damage.  Killing an undead with say Marien doesn't count.

    Lets remain positive, what about that discipline?  That can change this whole conversation you know what I am saying?  It's increased MP and the actual raw trait/stat of Piety.
    
    I am sorry I was wrong, let's not remain positive.  It is interesting that this is the first character to ever boost a raw trait (str, iq, pie, etc) as a discipline, and sure it buffs his spells damage due to it being purely Piety based, but good god it isn't useful at all otherwise.  Almost anything would have been better.

    In summary this guy seems to have an awesome backstory.  His design is legitimately cool.  The concept drecom pursued for this character was honestly solid, different, very creative, and commendable.  Sadly their execution was not quite so hot.  I really wish I could say this character is good, but he isn't.  So before I ended this by saying, who knows maybe his alt class will change this story?  It didn't, his alt class is theif.  Raffaello has been consigned to the doom of a pure support character with a weird niche of wanting to be front row with a two hand hammer as a priest.  He just doesn't work in hardly any comp, his skill is cool but nothing special plus not good on inherit, and his two classes just have horrible synergy.  This guy is a pass for any player who isn't in love with his character concept/design or obsessed with an all evil team.

??? info "Shiro's Analysis"

    Starting with his inheritance. It's a really solid damage option outdamaging 500 MATK mage lvl 3 MA spell (17 cost) while costing Raffaello 20 with 4 return every turn he kills something additionally giving front lane healing depending on numbers of target hit. Really strong inheritance on himself thanks to his ability to hit high piety especially with discipline.

    Moving on his passive. It’s 4 MP return per kill. Which gives him the ability to be a really good adventurer with a 2h hammer when it comes to the general content of the game. Really solid option for a priest with access to AoE.

    Moving to his discipline. So far it’s the best IMO discipline for priests. PIE+MP. Not only does it give better scaling with Priest Weapon Mastery but it also goes really well with the second abyss book giving him a bit better survivability. 

    As for class change I do hope it’s a knight. While a fighter would make him a better frontline it won’t go well with his PIE. And while mage would be nice thanks to MP regen per kill it doesn’t go well with him having a fire element and he’ll need to fight with other strong priest-mages like Alice, Adam or Sheli.

    To sum it up. Raffaello feels like a test towards bringing something close to lord class in future. Giving him access to strong PIE scaling aoe which doesn’t need DIV to keep the DMG and healing letting him to be frontline physical damage dealer fully. Who will use his AoE for occasional emergency situations. In the future getting a knight will push him to better sport as a physical damage option while giving him access to magic AoE that will scale with knight PIE. The only issue being will be the MP pool which will need to be covered by relics/gear. He might not be the best option as for now but I do love the idea of him playing and in my completely biased option he's a really good pick. Especially if you grab PIE IV, and his gacha gear to push his potential damage from PWM and survivability from the second abyss book so he can be a great frontline option.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    Definitely saving for the anniversary.

??? note "Karkarov's Pull Plan"
    If you love the design of this character or you are just someone that has to get a copy of every character for their roster, ok, I get it.  Pull 1 copy.
    
    If you are anyone else, do not pull.  His alt class basically added nothing other than making him slightly better for auto farming cause it increases money item drops.  Any theif can do that.  Raffalmao is confirmed bottom tier legend at this point and not worth your gems much less real world money.
    
## Duplicate Usage

* Inherit to increase the magnitude of his spell's damage and healing capabilities
* Discipline if you really want more MP and Piety
{% endblock ReviewsAndAnalysis %}

