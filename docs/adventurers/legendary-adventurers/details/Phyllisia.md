---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Phyllisia

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

<!-- any Character Reviews and pull plans go down here. Just uncomment sections -->


## Adventurer Reviews

??? info "TheAxolotl's Analysis"
    
    To everyone that assumed Healer was alignment-locked, Phyllisia comes in as an Evil healer to prove them wrong! Take that, all you naysayers! Before looking at the kit, since many people will be trying to compare her to Anemone, I want to point out the potential obvious - being Evil, she can be put in the back row alongside Alt Alice and receive a substantial defense boost from the row passive. This can make a back row of Alt Alice, Yuzu, and Phyllisia a very sturdy row if you're worried about mitigating high back row damage. Similarly, standard Alice could still provide Yuzu with her damage buff safely if you want to run that version, instead.

    Looking at her kit, let's start with the easy one - Cycle of Spirit and Life heals Phyllisia at 5x the base cost of the spell she uses. This heal is applied after the damage portion of a spell like Sacred Elixir of Heart's Blood, which can help offset the health cost there, with the downside being that she could kill herself with the Elixir before being healed. Unlikely unless you're careless, but worth knowing about. Since this is a passive, it's a nice way for her to stay topped off from any incidental damage she receives.

    Now for the more complex one, Encroachment of the Parasitic Tree, I strongly suspect many people are going to write this one off for a few reasons. They could be justified in that thought, but I wouldn't immediately jump to that conclusion. Encroachment is following the trend that we've started to see with 4-turn ramp-ups, but there's some nuance here. During the first few turns, the buffed adventurer receives 25% of max health as damage at the start of their turn, then heals for up to 50% of their maximum HP based on the damage they deal. This effectively gives a free Immortal Strike heal with any damage dealt, which isn't bad and has some interesting synergy with attacks like Veiled Moon and Drastic Strike. Every turn they spend attacking increases the magnitude of the second part of the skill. After 4 turns, this buff turns into a damage boost with a start-of-turn small heal. The damage boost is variable, based on the number of turns spent attacking during the first phase and results in either a white, pink, red, or deep red buff icon. When deep red, the damage increase appears to be somewhere in the ballpark of 400-500 additional damage. Each other color seems to reduce the buff by ~25%. The Imperishable state does not have a turn counter but Both the Bloodthirst and Imperishable states of this buff are subject to the 3 buff limit and can be pushed off, so be mindful of your buffs.

    Her Discipline, Arbiter of Life and Death, has a focus on Magic Power and Divine Power.

    In general, I like what I'm seeing with her kit, and I personally really like the ability to pick and choose her buff targets, rather than going for a full row like Anemone's. It's also important to note that you can buff multiple people with it in the event that you have multiple adventurers that would benefit from either the damage-based heal or the damage boost. Healer is an excellent class and Cycle of Spirit and Life makes Sacred Elixir an extremely efficient full party heal. Encroachment may or may not see use in a given fight, and since it takes 4 turns to ramp up, the damage gain over the course of a given fight is going to be relatively low, however I do think the self-healing component provides some good value that might otherwise get overlooked.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    
    I'll be pulling some to experiment with her. I personally think she's a better fit than Anemone for most parties, although I might be in the minority here. She's definitely easier to gear.

{% endblock ReviewsAndAnalysis %}
