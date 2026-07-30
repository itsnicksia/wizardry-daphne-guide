---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Zeid

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
    
    All three of the collab reviews here will be fairly similar and pretty succinct - all of the new adventurers are effectively Fighters with unique mechanics. Zeid is...a single target Gillion? His mechanic is all about HP manipulation - he loses HP to buff himself, and he can buff himself to gain HP back while attacking. He does dark damage with his own personal ESS-style attack. He also has a unique spell that lets him restore his own SP, which is pretty great!

    One big unknown, though, is just how valuable his buffs (both the offense boost at the cost of HP and the HP restore while dealing damage) would be in a fight. Self buffs usually have questionable turn economy, so Zeid runs the risk of having a very small amount of his kit be used in a given fight.

    As far as adventurers that lean into the Wizardry Variants Daphne approach to fights, Zeid is probably the most cohesive out of the bunch, but it's also the least flashy. One strange thing about Zeid's kit is that he has access to ESS in addition to his own personal version of it, which seems a bit silly. The HP manipulation can lead to some fun risk/reward trade-offs, and the SP restoration has solid potential for a Fighter.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    
    I'll likely be pulling on the collab - not sure how much yet, and not sure how much I'll use any of the adventurers. I admittedly probably won't use Zeid much, but I do like the SP restore spell!

{% endblock ReviewsAndAnalysis %}
