# List of Adventurers

=== "Basics"
    {{ populate_quicklist(file='adventurers.csv',return_columns=['Name','Race','Gender','Primary Class','Secondary Class','Type','Personality','Rarity']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Base Traits"
    {{ populate_quicklist(file='adventurers.csv',return_columns=['Name','Strength','IQ','Piety','Vitality','Dexterity','Speed','Luck']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Skill Inherits" 
    {{ populate_quicklist(file='adventurers.csv',return_columns=['Name','Inheritable Skill','Alternate Inheritable Skill','Potential Inherit']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Ruins"
    {{ populate_quicklist(file='adventurers.csv',return_columns=['Name','Unique Bone Name','Original Release Date','Alternate Bone Name','Alternate Release Date']) | convert_to_md_table | add_indentation(spaces=4) }}
