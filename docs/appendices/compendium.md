# Compendium  
<small>Note that special, limited time, and gacha equipment is often numbered as "Ex." making it harder to identify missing items. [Contributions of missing items welcome. (Screenshots preferred.)](../index.md#contributing)</small>  
=== "Characters"  

    === "All"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Characters"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Key Characters"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Characters" & Subcategory == "Key Characters"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Other"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Characters" & Subcategory == "Other"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Allies"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Characters" & Subcategory == "Allies"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

=== "Item"  
    
    === "All"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Item"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Sell Only"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Item" & Subcategory == "Sell Only"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Consumables"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Item" & Subcategory == "Consumables"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Valuables"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Item" & Subcategory == "Valuables"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Other"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Item" & Subcategory == "Other"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}
 
=== "Equipment"  
     
    === "All"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Equipment"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Weapons"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Equipment" & Subcategory == "Weapons"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Shields"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Equipment" & Subcategory == "Shields"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Head"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Equipment" & Subcategory == "Head"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Body"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Equipment" & Subcategory == "Body"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Hands"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Equipment" & Subcategory == "Hands"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Feet"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Equipment" & Subcategory == "Feet"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Accessories"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Equipment" & Subcategory == "Accessories"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

=== "Monsters"  

    === "All"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Monsters"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Monsters"  
       {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Monsters" & Subcategory == "Monsters"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Key Monsters"  
           {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Monsters" & Subcategory == "Key Monsters"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

