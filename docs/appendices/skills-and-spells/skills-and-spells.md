# Skills and Spells

## Skills:  
### Active Skills  

=== "Skill Description"
    
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Restriction','Effects','Detail'],filter_column='Type',filter_values=['Active']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}
 
=== "Skill Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Source','Potential Source'],filter_column='Type',filter_values=['Active']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Skill Costs"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Cost Type','CostL1','CostL2','CostL3','CostL4','CostL5','CostL6','CostL7'],filter_column='Type',filter_values=['Active']).set_axis(['Name','Point Type','L1','L2','L3','L4','L5','L6','L7'], axis=1)  | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

### Passive Skills    

=== "Skill Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Restriction','Inheritable','Effects','Detail'],filter_column='Type',filter_values=['Passive']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Skill Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Source','Potential Source'],filter_column='Type',filter_values=['Passive']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

### Discipline Skills

{{ populate_quicklist(file='skills.csv',return_columns=['Source','Name','Effects','Detail'],filter_column='Type',filter_values=['Discipline']).set_axis(['Adventurer','Name','Effects','Detail'], axis=1) | sort_mixed_values(sortcol="Adventurer") |  make_skillnames_linkable  | convert_to_md_table}}


## Spells:  
### Damage Spells  

=== "Spell Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Restriction','Effects','Detail'],filter_column='Type',filter_values=['Damage']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Spell Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Source','Potential Source'],filter_column='Type',filter_values=['Damage']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Skill Costs"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Cost Type','CostL1','CostL2','CostL3','CostL4','CostL5','CostL6','CostL7'],filter_column='Type',filter_values=['Damage']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}
    
### Support Spells  

=== "Spell Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Restriction','Effects','Detail'],filter_column='Type',filter_values=['Support']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Spell Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Source','Potential Source'],filter_column='Type',filter_values=['Support']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Skill Costs"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Cost Type','CostL1','CostL2','CostL3','CostL4','CostL5','CostL6','CostL7'],filter_column='Type',filter_values=['Support']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}
    
### Debuff Spells  

=== "Spell Description"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Restriction','Effects','Detail'],filter_column='Type',filter_values=['Debuff']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Spell Source"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Inheritable','Source','Potential Source'],filter_column='Type',filter_values=['Debuff']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}

=== "Skill Costs"

    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Cost Type','CostL1','CostL2','CostL3','CostL4','CostL5','CostL6','CostL7'],filter_column='Type',filter_values=['Debuff']) | make_skillnames_linkable | convert_to_md_table | add_indentation(spaces=4) }}
    
