# Syntax/style Reference


For brevity, examples are *not* duplicated as code blocks. Instead, refer to
the Markdown source of this page to see syntax for the examples.

## Admonitions

Admonitions are info boxes.

??? info "List of admonitions for The Guide"
    !!! item
        Type: `item`

        Meant for containing game items.
    !!! map
        Type: `map`

        Meant for containing dungeon maps.
    !!! note "Type: note"
        Types: `note` and `info`

        Using type `info` gets identical outcome.
    !!! warning "Type: warning"
        Type: `warning`
    !!! danger "Type: danger"
        Type: `danger`
    !!! bug "Type: bug"
        Type: `bug`
    !!! quote "Type: quote"
        Type: `quote`

### Examples

??? item "Collapsible admonition with tabs"
    === "First tab"
        This is the first tab
    === "Second tab"
        More content here

        Is possible.

???+ map "Collapsible admonition, expanded by default"
    Lorem ipsum

!!! danger inline end ""
    Box without a title line placed on the right side of the page. This
    admonition placement needs testing with different browser window sizes, as
    it can behave unexpectedly in some situations.


## Footnotes

A footnote[^1] goes to the bottom of the page, regardless where it's defined in
the source.

[^1]: I am a footnote.


## Custom Colors

Guide custom colors are accessible via custom CSS classes. Use sparingly;
embedding HTML/CSS into the Markdown sources is a **questionable**{ .orange }
practice.

:wiz-skull:{ .red }
:wiz-skull:{ .green }
:wiz-skull:{ .blue }
:wiz-skull:{ .purple }
:wiz-skull:{ .cyan }
<span class="orange">:wiz-skull:</span> <!-- Alternative method -->

## Highlighting

Try ^^highlighting^^ instead, to bring attention to ==important== parts.

~~Making the Guide look like a christmas tree was a good idea.~~

## Custom Icons

??? info "Table of custom icons"
    | name | icon |
    |------|------|
    |`:wiz-bug:` |:wiz-bug:|
    |`:wiz-dragon:` |:wiz-dragon:|
    |`:wiz-dungeon:` |:wiz-dungeon:|
    |`:wiz-fire-bottle:` |:wiz-fire-bottle:|
    |`:wiz-scroll:` |:wiz-scroll:|
    |`:wiz-shield:` |:wiz-shield:|
    |`:wiz-skull:` |:wiz-skull:|
    |`:wiz-sword:` |:wiz-sword:|
    |`:wiz-wheat:` |:wiz-wheat:|
