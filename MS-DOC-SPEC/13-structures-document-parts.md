# Structures

## Document Parts

The range of [CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)s in a
document is separated into multiple logical parts. Many features operate
within the individual parts and use CPs relative to the beginning of the
part in which they operate rather than relative to the beginning of the
document. This section defines the document parts and specifies the
corresponding range of CPs.

All documents MUST include a non-empty [Main
Document](#Section_f426d9a2004d418e8d8ce7fd88e7c48e) part. In addition,
if any of the other document parts are non-empty, the document MUST
include one additional [**paragraph
mark**](#gt_561de4b6-b1fb-438b-9eb7-57ce57eabab3) character
([**Unicode**](#gt_c305d0ab-8b94-461a-bd76-13b40cb8c4d8) 0x000D) beyond
the end of the last non-empty document part. That character is not
displayed to or editable by the user, because it is outside of any
document part.

### Main Document

The main document contains all content outside any of the specialized
document parts, including
[**anchors**](#gt_084d6638-17a5-4bf5-8bf1-70881bdeb997) that specify
where content from the other document parts appears.

The main document begins at
[CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) zero, and is
**[FibRgLw97](#fibrglw97).ccpText** characters long.

The last character in the main document MUST be a [**paragraph
mark**](#gt_561de4b6-b1fb-438b-9eb7-57ce57eabab3)
([**Unicode**](#gt_c305d0ab-8b94-461a-bd76-13b40cb8c4d8) 0x000D).

### Footnotes

The footnote document contains all of the content in the footnotes. It
begins at the [CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)
immediately following the [Main
Document](#Section_f426d9a2004d418e8d8ce7fd88e7c48e), and is
**[FibRgLw97](#fibrglw97).ccpFtn** characters long.

The locations of individual footnotes within the footnote document are
specified by a [PlcffndTxt](#plcffndtxt) whose location is specified by
the **fcPlcffndTxt** member of [**FibRgFcLcb97**](#fibrgfclcb97). The
locations of the footnote reference characters in the Main Document are
specified by a [**PlcffndRef**](#plcffndref) whose location is specified
by the **fcPlcffndRef** member of **FibRgFcLcb97**.

### Headers

The header document contains all content in headers and footers as well
as the footnote and endnote separators. It begins immediately after the
footnote document and is **[FibRgLw97](#fibrglw97).ccpHdd** characters
long.

The header document is split into text ranges called stories, as
specified by [**PlcfHdd**](#plcfhdd). Each story specifies the contents
of a single header, footer, or footnote/endnote separator. If a story is
non-empty, it MUST end with a [**paragraph
mark**](#gt_561de4b6-b1fb-438b-9eb7-57ce57eabab3) that serves as a guard
between stories. This paragraph mark is not considered part of the story
contents (that is, if the story contents require a paragraph mark
themselves, a second paragraph mark MUST be used).

Stories are considered empty if they have no contents and no guard
paragraph mark. Thus, an empty story is indicated by the beginning
[CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83), as specified in
**PlcfHdd**, being the same as the next CP in **PlcfHdd**.

If the header document exists, as indicated by **FibRgLw97.ccpHdd** and
**[FibRgFcLcb97](#fibrgfclcb97).lcbPlcfHdd** being nonzero, its first
six stories specify footnote and endnote separators, in this order.

| Story number | Contents                                                                        |
|--------------|---------------------------------------------------------------------------------|
| 0            | [**Footnote separator**](#gt_8504ae38-cbfd-4547-a410-03a7629920ae)              |
| 1            | [**Footnote continuation separator**](#gt_1650f6e9-5799-4a9d-895a-8a4107009dc7) |
| 2            | [**Footnote continuation notice**](#gt_fe7959b9-9b77-4bc0-887c-062cdedb9f68)    |
| 3            | [**Endnote separator**](#gt_d30c582e-70a2-419b-ba89-59fc910d165b)               |
| 4            | [**Endnote continuation separator**](#gt_9f358e09-3d87-49bc-8818-d328793e9ef5)  |
| 5            | [**Endnote continuation notice**](#gt_253d5240-eccc-4f28-a27b-1ff572f79b68)     |

> The footnote and endnote separator stories do not need to contain
> whole paragraphs—that is, they do not necessarily need to have
> paragraph marks in their contents. However, they MUST have the guard
> paragraph marks if they are non-empty.
>
> Following the footnote and endnote separator stories are the stories
> that contain the contents of headers and footers. Six such stories
> MUST exist for every
> [**section**](#gt_49a2b98a-d101-4889-9108-87f567e758cf) of the [Main
> Document](#Section_f426d9a2004d418e8d8ce7fd88e7c48e). The first such
> group of stories specifies the contents of the headers and footers for
> the first section. The second group specifies the contents of the
> headers and footers for the second section, and so on. The stories
> within each group MUST appear in the following order.

| Story number in group | Contents                                                                                                                                                     |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0                     | Even page header. This MUST be non-empty if different even and odd headers and footers are enabled for the section.                                          |
| 1                     | Odd page header. If different even and odd headers and footers are not enabled for the section, the odd page header MUST be used on both even and odd pages. |
| 2                     | Even page footer. This MUST be non-empty if different even and odd headers and footers are enabled for the section.                                          |
| 3                     | Odd page footer. If different even and odd headers and footers are not enabled for the section, the odd page footer MUST be used on both even and odd pages. |
| 4                     | First page header. This MUST be non-empty if different first page headers and footers are enabled for the section.                                           |
| 5                     | First page footer. This MUST be non-empty if different first page headers and footers are enabled for the section.                                           |

Non-empty header and footer stories MUST contain whole paragraphs and
thus MUST end with a paragraph mark. Therefore, non-empty header and
footer stories MUST have two paragraph marks at their ends, one as part
of the content followed by a separate guard paragraph mark.

An empty header or footer story specifies that the header or footer of
the corresponding type of the previous section is used. For the first
section, an empty header or footer story specifies that it does not have
a header or footer of this type.

### Comments

The comment document contains all of the content in the comments. It
begins at the [CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)
immediately following the [Header
Document](#Section_8465bee76c7945a9812e58b0c5fd6cdc) and is
**[FibRgLw97](#fibrglw97).ccpAtn** characters long.

The locations of individual comments within the comment document are
specified by a [**PlcfandTxt**](#plcfandtxt) whose location is specified
by the **fcPlcfandTxt** member of [**FibRgFcLcb97**](#fibrgfclcb97). The
locations of the comment reference characters in the [Main
Document](#Section_f426d9a2004d418e8d8ce7fd88e7c48e) are specified by a
[**PlcfandRef**](#plcfandref) whose location is specified by the
**fcPlcfandRef** member of **FibRgFcLcb97**.

### Endnotes

The endnote document contains all of the content in the endnotes. It
begins at the [CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) that
immediately follows the [Comment
Document](#Section_486f5a89fba5412f8ac61c551654ddcd) and is
**[FibRgLw97](#fibrglw97).ccpEdn** characters long.

The locations of individual endnotes within the endnote document are
specified by a [PlcfendTxt](#plcfendtxt) whose location is specified by
the **fcPlcfendTxt** member of [**FibRgFcLcb97**](#fibrgfclcb97). The
locations of the endnote reference characters in the [Main
Document](#Section_f426d9a2004d418e8d8ce7fd88e7c48e) are specified by a
[PlcfendRef](#plcfendref) whose location is specified by the
**fcPlcfendRef** member of **FibRgFcLcb97**.

### Textboxes

The textbox document contains all of the content in the textboxes whose
anchors are in the [Main
Document](#Section_f426d9a2004d418e8d8ce7fd88e7c48e). It begins at the
[CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) immediately following
the [Endnote Document](#Section_13659f756a694a5f8e035f9bced90faa) and is
**[FibRgLw97](#fibrglw97).ccpTxbx** characters long.

The locations of individual textboxes within the textbox document are
specified by a [PlcftxbxTxt](#plcftxbxtxt) whose location is specified
by the **fcPlcftxbxTxt** member of the
[**FibRgFcLcb97**](#fibrgfclcb97). The locations of the textbox
[**anchors**](#gt_084d6638-17a5-4bf5-8bf1-70881bdeb997) in the Main
Document are specified by a [**plcfSpa**](#plcfspa) whose location is
specified by the **fcPlcSpaMom** member of the **FibRgFcLcb97**.

Not all members of a **plcfSpa** specify the location of a textbox. The
**lid** member of the [FTXBXS](#ftxbxs) structure specifies the
relationship between shape anchors and textbox anchors.

### Header Textboxes

The header textbox document contains all of the content in the textboxes
whose anchors are in the [Header
Document](#Section_8465bee76c7945a9812e58b0c5fd6cdc). It begins at the
[CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) immediately following
the [Textbox Document](#Section_f87b35602c234d109751ff141d307308) and is
**[FibRgLw97](#fibrglw97).ccpHdrTxbx** characters long.

The locations of individual textboxes within the header textbox document
are specified by a [**PlcfHdrtxbxTxt**](#plcfhdrtxbxtxt) whose location
is specified by the **fcPlcfHdrtxbxTxt** member of the
[**FibRgFcLcb97**](#fibrgfclcb97). The locations of the textbox
[**anchors**](#gt_084d6638-17a5-4bf5-8bf1-70881bdeb997) in the Header
Document are specified by a [**plcfSpa**](#plcfspa) whose location is
specified by the **fcPlcSpaHdr** member of the **FibRgFcLcb97**.

Not all members of a **plcfSpa** specify the location of a textbox. The
**lid** member of the [**FTXBXS**](#ftxbxs) structure specifies the
relationship between shape anchors and textbox anchors.
