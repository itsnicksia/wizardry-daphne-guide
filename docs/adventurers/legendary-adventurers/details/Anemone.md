---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Anemone

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
    
    Hey, this time around, we get a whole host of things to look at! In general, I'm going to keep this focused on Anemone's kit, however I'll likely throw in a little bit about the new race and new class.

    First of all, looking at what sets her apart, Hero's Medicine is the most noteworthy highlight. This is a targeted front row Attack Power boost that is fairly significant in magnitude and it gets a further boost when there is a continuous heal applied to the buff recipient (such as Self Healing, Blessing of Renewal, or new Healer spells). Early test shows that an inherited Medicine gives approximately a 15% damage boost when there's no continuous healing being applied and closer to 20% when there is. This buff does seem to have a combination of percentage and flat bonuses to it, but when cast herself, the magnitude seems closer to 20% without a continuous heal and 25% with. These numbers will potentially change as we get more testing done.
    
    A couple of key things to note about this buff are that it is not impacted by Alice's inherit and it can be maintained in perpetuity through recasting the buff to extend its duration. The latter is very important because if it drops off, even if it gets reapplied later, the buff recipient gets an Action Speed debuff. This debuff cannot be removed by ABIT and does seem to be a smaller debuff than that from Wild Strike. This means that in order to prevent the debuff, Anemone needs to be reapplying the buff BEFORE the buff drops from the front row and not after.

    Her passive skill, Helping Uphold Justice, is a Good/Neutral damage boost to her row that appears to be approximately 10-15%. The key thing here is that the buff behaves more like Rinne's buff, boosting the damage of those that meet the criteria. It does not behave like Lana and Alice's buffs, which become inactive when adventurers that don't meet the criteria are in the row. This means you can have a back row of Anemone, someone Evil, and someone Good or Neutral, and the Good or Neutral adventurer will still receive the buff despite an Evil adventurer also being there. This is great behavior, however the buff itself could very well be a throwaway passive due to the fact that most parties run with multiple Evil adventurers in their back rows.

    Her Discipline is Magic Power and Sleep Tolerance, which is...whatever.

    One important thing to note is that Faeries are very equipment-restricted. They must use Faerie-specific equipment if they want to get any base stats from their gear (aside from accessories). Blessings will always apply, but if, for example, you equip her with a piece of Cloth gear that had 10 ASPD baked into it, if it wasn't Faerie-specific equipment, you would not receive that 10 ASPD. This is even more impactful on something like a 1h staff - if it's not a Faerie-specific weapon, she will not receive the innate MAG/DIV from the weapon despite being able to equip it.

    Now, looking at the Healer class, this is an interesting one. It's very much geared towards status prevention and should not be considered as a "Priest replacement" for challenging content. Rather, it supplements Priest quite nicely, allowing the Priest to focus on healing and the Healer to focus on preventing practically any status, whether it be common ones like Confusion or more unique ones like Chill and Stun. This prevention can enable some interesting combinations like allowing Shiou to use a Snow Yoto and not get hit with the self chill.

    In general, I think Anemone is a very unique adventurer that has the potential to provide a lot of value in challenging content, but will not be something that every party wants to run at all times and not everyone is going to want to pull for her.


## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    
    I'm still debating here, but I'll probably try to pull for a copy (and maybe a second for the OCD Discipline) just so I can experiment with her. I think there might be a few times when I want to use her, but she'd definitely be in a flex spot within my party if I do.

{% endblock ReviewsAndAnalysis %}