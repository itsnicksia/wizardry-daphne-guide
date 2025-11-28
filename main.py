import pandas as pd

def define_env(env):

    from mkdocs_table_reader_plugin.readers import pd_read_csv

    @env.macro
    def get_skill_description(skill_name):
        
        skill = pd.DataFrame(pd_read_csv('data/skills.csv').query(f'Name == "{skill_name}"'))
        
        effect = skill['Effects'].iloc[0]
        details = skill['Detail'].fillna('').iloc[0]
        restriction = skill['Restriction'].fillna('').iloc[0]
       
        if restriction:
            restriction = f'<{restriction}>'
       
        return f"{effect} {details} {restriction}"
    
    @env.macro
    def populate_quicklist(file,return_columns,filter_column=None,filter_values=[]):

        results = pd_read_csv(f'./data/{file}')
        if filter_column != None and filter_values:
            results = results.query(f'`{filter_column}` in {filter_values}')
        results = results.infer_objects(copy=False).fillna('')

        # Only linkify names if file is adventurers.csv and required fields exist
        if file == 'adventurers.csv' and 'Name' in return_columns and 'Rarity' in results.columns:
            def linkify(row):
                name = row['Name']
                rarity = row['Rarity'].strip().lower()
                name_slug = name.replace(' ', '-')
                return f"[{name}](./{rarity}-adventurers/details/{name_slug}.md)"
            results['Name'] = results.apply(linkify, axis=1)

        return results[return_columns]
        
    @env.macro
    def get_equip_table_quicklist(armor_or_weapon, itemtype):
        equipcols = range(2,60)
        eqdata = pd_read_csv(f'./data/{armor_or_weapon}.csv',
                              usecols=equipcols, 
                              dtype='str',
                              skip_blank_lines=True)
        eqdata = eqdata.fillna('')
        results = eqdata
        return results

    @env.macro
    def get_equip_table_formatted(armor_or_weapon, itemtype):
        equipcols = range(2,60) # skip first two columns just used for spreadsheet to create csv

        # read google sheet csv. all elements processed as strings for display
        # and ignore any blank lines between sections.
        eqdata = pd_read_csv(f'./data/{armor_or_weapon}.csv',
                              usecols=equipcols,
                              dtype='str', 
                              skip_blank_lines=True,
                              index_col=False)

        # trim dataframe to only the type requested
        eqdata.drop(eqdata[eqdata['Type'] != itemtype].index, inplace=True)

        # drop any lines from item section without an actual item
        eqdata.dropna(subset = ['Item Name'], inplace = True)        
        
        # blank any empty cells
        eqdata.fillna('', inplace = True) 

        # drop all but requested type
        eqdata.drop(eqdata.iloc[:,0:1],axis=1, inplace = True) 

        # name the id column for later use keeping things sorted
        eqdata.index.name = 'itemnumber'
        itemcount = len(eqdata.index)
      
        # Get headers from the dataframe
        headers_to_use = eqdata.iloc[:,:16].columns  #Index object    
        html_headers = pd.DataFrame(headers_to_use).T.to_html(index=False, header=False)

        # get titles, details, and attribdata 
        unstackedcols = ['Compendium Number', 'Item Name', 'Traits / Special Effects']
        
        if armor_or_weapon == "weapon":
            stackedcols = ['Rank', '# of Attacks', 'Buy Price', 'Sell Price']        
        else:
            stackedcols = ['Rank', 'Armor Type', 'Buy Price', 'Sell Price']        

        attribnames = ['ATK', 'MAG', 'DIV', 'DEF', 'MDEF',
                       'ASPD', 'ACC', 'SUR', 'EVA', 'RES']

        rename_cols = ['TEMP0', 'TEMP5', 'TEMP10', 'TEMP15']

        eqdata.rename(columns=dict(zip(stackedcols, rename_cols)), inplace=True)
  
        attribnames = ['TEMP'] + attribnames
        
        eqdata.reset_index(inplace=True)
        eqdata = pd.wide_to_long(eqdata, attribnames, i='itemnumber', j='Enhance Level', suffix=r'\d+')
        itemrows = eqdata.index.get_level_values(1).nunique()
        eqdata.sort_index(level ='itemnumber', sort_remaining = True, inplace=True)
        eqdata.reset_index(inplace=True)
        eqdata = eqdata[unstackedcols[:2] + attribnames[:1]+['Enhance Level'] + attribnames[1:] + unstackedcols[2:]]

        # blank the duplicate title and effects cells in unstackedcols
        for n in range (1, itemcount+1, 1):
            eqdata.loc[1+5*(n-1) : 4+5*(n-1), unstackedcols] = ''

        # change title of stacked column
        
        if armor_or_weapon == "weapon":
           eqdata.rename(columns={'TEMP': 'Rank<br>#Attacks<br>Buy Price<br>Sell Price'}, inplace=True)
        else:
           eqdata.rename(columns={'TEMP': 'Rank<br>ArmorType<br>Buy Price<br>Sell Price'}, inplace=True)
 
        # insert blank spacer rows
        if itemcount > 1:
            for n in range(itemrows*(itemcount-1), 0, -itemrows):
                blank_row = pd.DataFrame({col: None for col in eqdata.columns}, index=[n])
                eqdata = pd.concat([eqdata.iloc[:n], blank_row, eqdata.iloc[n:]])
               
            eqdata.reset_index(drop=True, inplace=True)

        # blank any empty cells
        eqdata.fillna('', inplace = True) 
        

        return eqdata

    @env.filter
    def make_skillnames_linkable(df):
        df['Name'] ='<span id = "' + df['Name'].str.replace(' ', '') + '">' + \
                    df['Name'].astype(str) + '</span>'
        return df

    @env.filter
    def linkify_quicklist_skillnames(df):
        df['Name'] = '[' + df['Name'].astype(str) + ']'\
                     + '(./skills-and-spells.md#' \
                     + df['Name'].str.replace(' ', '') + ')'
        return df
