# List of Skills Learned by Each Class
 
- Restrictions:  
    - <em>Class</em>-restricted skills become unusable if the adventurer changes to another class.
    - <em>Item</em>-restricted skills are only usable when that particular piece of equipment is equipped.
- Mage spells:
    - Mages learn single, row (MA-), and all (LA-) target attack spells according to their type (element).  
    - Elemental types learn spells of their element and the element they are weak against (e.g., fire and water). Light, Dark, and Void types only learn their spell types.

[List of Skill Descriptions](./skills-and-spells.md)  

=== "Main Classes"  
    === "Fighter" 
        {{ populate_quicklist(filter_values=['Fighter'], 
        file='skills.csv',
        return_columns=['Level','Name','Type','Restriction'],
        filter_column='Class')
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }}
    
    === "Knight"
        {{ populate_quicklist(filter_values=['Knight'], 
        file='skills.csv',
        return_columns=['Level','Name','Type','Restriction'],
        filter_column='Class')
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }}
    
    === "Thief"
        {{ populate_quicklist(filter_values=['Thief'], 
        file='skills.csv',
        return_columns=['Level','Name','Type','Restriction'],
        filter_column='Class')
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }}
    
    === "Priest"
        {{ populate_quicklist(filter_values=['Priest'], 
        file='skills.csv',
        return_columns=['Level','Name','Type','Restriction'],
        filter_column='Class')
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }}

    === "Mage"
        {{ populate_quicklist(filter_values=['Mage'], 
        file='skills.csv',
        return_columns=['Level','Name','Type','Restriction'],
        filter_column='Class')
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }}

    === "Healer"
        {{ populate_quicklist(filter_values=['Healer'], 
        file='skills.csv',
        return_columns=['Level','Name','Type','Restriction'],
        filter_column='Class')
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }}
    
    === "Ninja"
        {{ populate_quicklist(filter_values=['Ninja'], 
        file='skills.csv',
        return_columns=['Level','Name','Type','Restriction'],
        filter_column='Class')
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }}
        
    === "Samurai"
        {{ populate_quicklist(filter_values=['Samurai'], 
        file='skills.csv',
        return_columns=['Level','Name','Type','Restriction'],
        filter_column='Class')
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }}
    
    === "Ranger"
        {{ populate_quicklist(filter_values=['Ranger'], 
        file='skills.csv',
        return_columns=['Level','Name','Type','Restriction'],
        filter_column='Class')
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }}

=== "Unique Classes"
    === "Mage of the Black Rod"
        {{ populate_quicklist(filter_values=['Mage of the Black Rod'], 
        file='unique-class-skills.csv',
        return_columns=['Name','Level'],
        filter_column='Class')
        | complete_unique_skills_list
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }} 
        
    === "Samurai of the Black Rod"
        {{ populate_quicklist(filter_values=['Samurai of the Black Rod'], 
        file='unique-class-skills.csv',
        return_columns=['Name','Level'],
        filter_column='Class')
        | complete_unique_skills_list
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }} 
        
    === "Tall Mage"
        {{ populate_quicklist(filter_values=['Tall Mage'], 
        file='unique-class-skills.csv',
        return_columns=['Name','Level'],
        filter_column='Class')
        | complete_unique_skills_list
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }} 
        
    === "Silver-Haired Nun"
        {{ populate_quicklist(filter_values=['Silver-Haired Nun'], 
        file='unique-class-skills.csv',
        return_columns=['Name','Level'],
        filter_column='Class')
        | complete_unique_skills_list
        | linkify_quicklist_skillnames(page.file.src_uri)
        | sort_mixed_values(sortcol="Level")
        | convert_to_md_table 
        | add_indentation(spaces=8) }}    

