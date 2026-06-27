# Structures

## Document Content

This section specifies algorithms that are used to analyze document
content and determine its properties. These algorithms take
[CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)s as input and return
some piece of information about the document content at that location.
For example, the algorithm in section
[2.4.1](#Section_01d5d8c4cf9c4ef980fd439e763cfe01) returns the text at
that CP.

Collectively, these algorithms specify relationships among data
structures in the file types that are specified in this documentation.
These relationships MUST be maintained. These algorithms are not
examples, but definitions of how to interpret these data structures.

These algorithms can derive significant performance benefits from common
programming practices such as caching the results from previous input.

### Retrieving Text

The following algorithm specifies how to find the text at a particular
[character position](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)
(**cp**). Negative character positions are not valid.

1.  Read the [**FIB**](#fib) from offset zero in the [WordDocument
    Stream](#Section_d7fae142670d4cd5869a708366984a71).

2.  All versions of the **FIB** contain exactly one
    [**FibRgFcLcb97**](#fibrgfclcb97), though it can be nested in a
    larger structure. **FibRgFcLcb97.fcClx** specifies the offset in the
    [Table Stream](#Section_44f62054d9114989946ca42100c26a15) of a
    [**Clx**](#clx). **FibRgFcLcb97.lcbClx** specifies the size, in
    bytes, of that **Clx**. Read the **Clx** from the Table Stream.

3.  The **Clx** contains a [**Pcdt**](#pcdt), and the **Pcdt** contains
    a [**PlcPcd**](#plcpcd). Find the largest *i* such that
    **PlcPcd.aCp\[***i***\]** ≤ **cp**. As with all
    [**Plc**](#Section_a649fcc578684245be1204eea89d916b)s, the elements
    of **PlcPcd.aCp** are sorted in ascending order. Recall from the
    definition of a **Plc** that the **aCp** array has one more element
    than the **aPcd** array. Thus, if the last element of **PlcPcd.aCp**
    is less than or equal to **cp**, **cp** is outside the range of
    valid character positions in this document.

4.  **PlcPcd.aPcd\[***i***\]** is a [**Pcd**](#pcd). **Pcd.fc** is an
    [**FcCompressed**](#fccompressed) that specifies the location in the
    WordDocument Stream of the text at character position
    **PlcPcd.aCp\[***i***\]**.

5.  If **FcCompressed.fCompressed** is zero, the character at position
    **cp** is a 16-bit
    [**Unicode**](#gt_c305d0ab-8b94-461a-bd76-13b40cb8c4d8) character at
    offset **FcCompressed.fc** + 2(**cp** -
    **PlcPcd**.**aCp\[***i***\]**) in the WordDocument Stream. This is
    to say that the text at character position **PlcPcd.aCP\[***i***\]**
    begins at offset **FcCompressed.fc** in the WordDocument Stream and
    each character occupies two bytes.

6.  If **FcCompressed.fCompressed** is 1, the character at position
    **cp** is an 8-bit ANSI character at offset (**FcCompressed.fc**
    / 2) + (**cp** - **PlcPcd**.**aCp\[***i***\]**) in the WordDocument
    Stream, unless it is one of the special values in the table defined
    in the description of **FcCompressed.fc**. This is to say that the
    text at character position **PlcPcd.aCP\[***i***\]** begins at
    offset **FcCompressed.fc** / 2 in the WordDocument Stream and each
    character occupies one byte.

### Determining Paragraph Boundaries

This section specifies how to find the beginning and end [character
positions](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) of the paragraph
that contains a given character position. The character at the end
character position of a paragraph MUST be a [**paragraph
mark**](#gt_561de4b6-b1fb-438b-9eb7-57ce57eabab3), an end-of-section
character, a cell mark, or a TTP mark (See [Overview of
Tables](#Section_5b45f0e777604fdbaf880146de2feb4c)). Negative character
positions are not valid.

To find the character position of the first character in the paragraph
that contains a given character position **cp**:

1.  Follow the algorithm from [Retrieving
    Text](#Section_01d5d8c4cf9c4ef980fd439e763cfe01) up to and including
    step 3 to find *i*. Also remember the
    [**FibRgFcLcb97**](#fibrgfclcb97) and [**PlcPcd**](#plcpcd) found in
    step 1 of Retrieving Text. If the algorithm from Retrieving Text
    specifies that **cp** is invalid, leave the algorithm.

2.  Let **pcd** be **PlcPcd.aPcd\[***i***\].**

3.  Let **fcPcd** be **[Pcd](#pcd).fc.fc.** Let **fc** be **fcPcd** +
    2(**cp** – **PlcPcd.aCp\[***i***\]**). If **Pcd.fc.fCompressed** is
    one, set **fc** to **fc** / 2, and set **fcPcd** to **fcPcd**/2.

4.  Read a [**PlcBtePapx**](#plcbtepapx) at offset
    **FibRgFcLcb97**.**fcPlcfBtePapx** in the [Table
    Stream](#Section_44f62054d9114989946ca42100c26a15), and of size
    **FibRgFcLcb97**.**lcbPlcfBtePapx**. Let **fcLast** be the last
    element of **plcbtePapx.aFc**. If **fcLast** is less than or equal
    to **fc**, examine **fcPcd**. If **fcLast** is less than **fcPcd**,
    go to step 8. Otherwise, set **fc** to **fcLast**. If
    **Pcd.fc.fCompressed** is one, set **fcLast** to **fcLast** / 2. Set
    **fcFirst** to **fcLast** and go to step 7.

5.  Find the largest *j* such that **plcbtePapx.aFc\[***j***\]** ≤
    **fc**. Read a [**PapxFkp**](#papxfkp) at offset
    **aPnBtePapx\[***j***\].pn** \*512 in the [WordDocument
    Stream](#Section_d7fae142670d4cd5869a708366984a71).

6.  Find the largest *k* such that **PapxFkp.rgfc\[***k***\]** ≤ **fc**.
    If the last element of **PapxFkp.rgfc** is less than or equal to
    **fc**, then **cp** is outside the range of character positions in
    this document, and is not valid. Let **fcFirst** be
    **PapxFkp.rgfc\[***k***\]**.

7.  If **fcFirst** is greater than **fcPcd**, then let **dfc** be
    **(fcFirst – fcPcd)**. If **Pcd**.**fc**.**fCompressed** is zero,
    then set **dfc** to **dfc** / 2. The first character of the
    paragraph is at character position **PlcPcd.aCp\[***i***\] + dfc**.
    Leave the algorithm.

8.  If **PlcPcd.aCp\[***i***\]** is 0, then the first character of the
    paragraph is at character position 0. Leave the algorithm.

9.  Set **cp** to **PlcPcd.aCp\[***i***\]**. Set *i* to *i* - 1. Go to
    step 2.

To find the character position of the last character in the paragraph
that contains a given character position **cp**:

1.  Follow the algorithm from Retrieving Text up to and including step 3
    to find *i*. Also remember the **FibRgFcLcb97**, and **PlcPcd**
    found in step 1 of Retrieving Text. If the algorithm from Retrieving
    Text specifies that **cp** is invalid, leave the algorithm.

2.  Let **pcd** be **PlcPcd.aPcd\[***i***\]**.

3.  Let **fcPcd** be **Pcd.fc.fc**. Let **fc** be **fcPcd** + 2(**cp** –
    **PlcPcd.aCp\[***i***\]**). Let **fcMac** be **fcPcd** +
    2(**PlcPcd.aCp**\[*i*+1\] - **PlcPcd.aCp\[***i***\]**). If
    **Pcd.fc.fCompressed** is one, set **fc** to **fc**/2, set **fcPcd**
    to **fcPcd** /2 and set **fcMac** to **fcMac**/2.

4.  Read a **PlcBtePapx** at offset **FibRgFcLcb97**.**fcPlcfBtePapx**
    in the Table Stream, and of size
    **FibRgFcLcb97**.**lcbPlcfBtePapx**. Then find the largest *j* such
    that **plcbtePapx.aFc**\[*j*\] ≤ **fc**. If the last element of
    **plcbtePapx.aFc** is less than or equal to **fc**, then go to
    step 7. Read a **PapxFkp** at offset **aPnBtePapx**\[*j*\]**.pn**
    \*512 in the WordDocument Stream.

5.  Find largest *k* such that **PapxFkp.rgfc\[***k***\]** ≤ **fc**. If
    the last element of **PapxFkp.rgfc** is less than or equal to
    **fc**, then **cp** is outside the range of character positions in
    this document, and is not valid. Let **fcLim** be
    **PapxFkp.rgfc\[***k+1***\]**.

6.  If **fcLim** ≤ **fcMac**, then let **dfc** be **(fcLim – fcPcd)**.
    If **Pcd**.**fc**.**fCompressed** is zero, then set **dfc** to
    **dfc** / 2. The last character of the paragraph is at character
    position **PlcPcd.aCp\[***i***\] + dfc –** 1. Leave the algorithm.

7.  Set **cp** to **PlcPcd.aCp\[***i*+1**\]**. Set *i* to *i* + 1. Go to
    step 2.

### Overview of Tables

A table cell consists of one or more paragraphs at the same nonzero
table depth and, optionally, one or more tables whose table depth is one
greater than that of the containing cell. The last paragraph in a table
cell is terminated by a cell mark. If the table depth is 1, the cell
mark MUST be character
[**Unicode**](#gt_c305d0ab-8b94-461a-bd76-13b40cb8c4d8) 0x0007. If the
table depth is greater than 1, the cell mark MUST be a [**paragraph
mark**](#gt_561de4b6-b1fb-438b-9eb7-57ce57eabab3) (Unicode 0x000D) with
[sprmPFInnerTableCell](#paragraph-properties) applied with a value of 1.

A table row has between 1 and 63 table cells, each at the same table
depth, followed by a Table Terminating Paragraph mark (TTP mark, also
called a row mark), also at the same table depth. If the table depth is
1, then the TTP mark MUST be a character Unicode 0x0007 with sprmPFTtp
applied with a value of 1. If the table depth is greater than 1, then
the TTP mark MUST be a paragraph mark (Unicode 0x000D) with
sprmPFInnerTtp applied with a value of 1.

The table depth of a paragraph, table cell, or table row, is derived
from the values of sprmPFInTable, sprmPItap, and sprmPDtap applied as
direct paragraph properties to the paragraph mark, cell mark, or TTP
mark. See section [2.4.6.1](#Section_61b635c32c444155bf17fec281b30c71),
Direct Paragraph Formatting for further specifications. Paragraphs that
are not in a table have a table depth of zero.

The following \[ABNF\] rulelist defines a table at depth *N* (TableN) in
terms of paragraphs at depth *N* (ParaN), cell marks at depth *N*
(CellMarkN), TTP marks at depth *N* (TTPN), and tables at depth *N*+1
(TableN1). ABNF is specified in
[\[RFC4234\]](https://go.microsoft.com/fwlink/?LinkId=90462).

> <embed src="media/media/image2.bin" title="Table at depth N"
> style="width:3.1875in;height:0.75in" />

Two adjacent table rows of the same table depth are considered part of
the same table unless they differ in one of the following properties:

- The operand to [sprmTIpgp](#table-properties)

- The table style, as specified by sprmTIstd

- The table directionality as specified by section sprmTFBidi or section
  sprmTFBidi90

- The table position and wrapping as specified by sprmTPc,
  sprmTFNoAllowOverlap, sprmTDxaAbs, sprmTDyaAbs, sprmTDxaFromText,
  sprmTDyafromText, sprmTDxaFromTextRight, and sprmTDyaFromTextBottom

If neither table row specifies nondefault values for the preceding table
position and wrapping properties, then two adjacent table rows of the
same table depth are considered different tables if the first paragraphs
of the first cells of the rows differ in any of the paragraph frame
properties specified by sprmPPc, sprmPDxaAbs, sprmPDyaAbs,
sprmPDxaWidth, sprmPWHeightAbs, sprmPDcs, sprmPWr, sprmPDxaFromText,
sprmPDyaFromText, sprmPFLocked, sprmPFNoAllowOverlap, and
sprmPFrameTextFlow.

In addition, two table rows are considered part of different tables if a
[**range-level protection
bookmark**](#gt_de964a62-a534-4a1d-9d49-6cadafb096be) is present whose
type, as specified by the **sdtt** member of the corresponding
[SDTI](#sdti), is sdttPara and that bookmark (1) contains content from
more than one table cell but does not contain the entirety of both rows.

The properties of each row mark MUST define the cells for that table
row. SprmTDefTable and sprmTInsert are used to create cell definitions,
and sprmTDelete is used to remove them. The number of cell definitions
applied to the row mark MUST be equal to the number of cells in the row.
There is no requirement that each row of a table have the same number of
cells.

An application SHOULD[\<9\>](#Appendix_A_9) use sprmTDefTable to define
table cells for applications that do not process sprmPTableProps, and at
the same time use sprmTInsert for applications that do process
sprmPTableProps.

The following diagram shows several elements of a table and gives
examples of [**Sprm**](#sprm)s that can be used to modify each. The
table in this example includes spacing between cells to demonstrate
borders and shading. It includes a nested table to demonstrate table
depth.

<embed src="media/media/image3.bin" title="A sample table"
style="width:6.41667in;height:4.60417in" />

Figure 1: A sample table

To determine which borders are displayed, see the following sections
from [\[ECMA-376\]](https://go.microsoft.com/fwlink/?LinkId=200054) Part
1:

- Section 17.4.66 tcBorders (Table Cell Borders)

- Section 17.4.39 tblBorders (Table Border Exceptions)

- Section 17.4.38 tblBorders (Table Borders)

Cells can be vertically merged to create the appearance of a single cell
spanning multiple rows. The cell mark characters for the merged cells
MUST still appear in the file. The second and subsequent cells in the
merged group MUST NOT contain any content other than their cell marks.
The following diagram shows a table with vertically merged cells. It
uses inside borders to demonstrate that the vertically merged cells act
as one cell.

<embed src="media/media/image4.bin"
title="A table with vertically merged cells"
style="width:5.05208in;height:2.42708in" />

Figure 2: A table with vertically merged cells

### Determining Cell Boundaries

This section describes an algorithm to find the boundaries of the
innermost table cell containing a given [character
position](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) or to determine
that the given character position is not in a table cell. Every valid
character position in a document belongs to a paragraph, so table depth
can be computed for each paragraph. If a paragraph is found to be at
depth zero, that paragraph is not in a table cell.

Given character position **cp**, use the following algorithm to
determine if **cp** is in a table cell.

1.  Follow the procedure from [Direct Paragraph
    Formatting](#Section_61b635c32c444155bf17fec281b30c71) to find the
    paragraph properties for the paragraph that contains **cp**. Apply
    the properties, and determine the table depth as specified in
    [Overview of Tables](#Section_5b45f0e777604fdbaf880146de2feb4c).
    Call this **itapOrig**.

2.  If **itapOrig** is 0, then this paragraph is not in a table cell, so
    the following algorithms do not apply. Leave this algorithm.
    Otherwise, **cp** is in a table.

3.  If the character at character position **cp** is not a TTP mark as
    specified in Overview of Tables, then leave this algorithm.

4.  If **itapOrig** is 1, then the **cp** is not in a table cell. Leave
    this algorithm. Otherwise this TTP mark is in a cell itself, to
    determine the boundaries of the containing cell set **itapOrig** to
    **itapOrig** – 1 in the following algorithms.

Given a character position **cp** known to be at table depth
**itapOrig**, follow this procedure to determine the character position
of the last character in the innermost table cell that contains **cp**.

1.  Set **itap** to **itapOrig**.

2.  Determine the character position of the last character in the
    paragraph that contains **cp**, as specified in [Determining
    Paragraph Boundaries](#Section_30461a5be3ad44cda3fe038f86639b13).
    Let this position be called **cpLast**.

3.  Follow the procedure from Direct Paragraph Formatting to find the
    paragraph properties for the paragraph that contains **cpLast**.
    Apply the properties, and determine the table depth as specified in
    Overview of Tables. Call this **itap'**. It is invalid for **itap'**
    to be less than **itap**. If **itap'** is less than **itap**, leave
    the algorithm.

4.  If **itap'** is equal to **itap**, determine the text at character
    position **cpLast**, as specified in [Retrieving
    Text](#Section_01d5d8c4cf9c4ef980fd439e763cfe01). If this character
    is a cell mark, as specified in Overview of Tables, then **cpLast**
    is the desired output. Leave the algorithm.

5.  Let **cp** be **cpLast** + 1, and go to step 2.

Given a character position **cp** that is known to be at table depth
**itapOrig,** follow this procedure to determine the character position
of the first character in the innermost table cell that contains **cp**.

1.  Set **itap** to **itapOrig**.

2.  Determine the character position of the first character in the
    paragraph that contains **cp**, as specified in Determining
    Paragraph Boundaries. Let this character position be called
    **cpFirst**.

3.  If **cpFirst** is zero, then this is the desired output. Leave the
    algorithm. Negative values for **cpFirst** are invalid. If
    **cpFirst** is negative, leave the algorithm.

4.  Let **cpPrev** be **cpFirst** – 1. Follow the procedure from Direct
    Paragraph Formatting to find the paragraph properties for the
    paragraph that contains **cpPrev**. Apply the properties, and
    determine the table depth as specified in Overview of Tables. Call
    this **itapPrev**.

5.  If **itapPrev** is less than **itap**, then **cpFirst** is the
    desired output. Leave the algorithm.

6.  If **itapPrev** is equal to **itap**, determine the text at
    character position **cpPrev**, as specified in Retrieving Text. If
    this character is a cell mark or a TTP mark, then **cpFirst** is the
    desired output. Leave the algorithm.

7.  Set **cp** to **cpPrev**. Go to step 2.

### Determining Row Boundaries

This section describes an algorithm to find the boundaries of the
innermost table row containing a given [character
position](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) or to determine
that the given character position is not in a table row. Every valid
character position in a document belongs to a paragraph, so table depth
can be computed for each paragraph. If a paragraph is found to be at
depth zero, then that paragraph is not in a table row.

This algorithm is the same as [Determining Cell
Boundaries](#Section_e32f7b2f47594e8f9ef9e0cdfd11a335) except that only
TTP marks cause a termination, not cell marks.

Given character position **cp**, use the following algorithm to
determine if **cp** is in a table.

1.  Follow the procedure from [Direct Paragraph
    Formatting](#Section_61b635c32c444155bf17fec281b30c71) to find the
    paragraph properties for the paragraph that contains **cp**. Apply
    the properties and determine the table depth as specified in
    [Overview of Tables](#Section_5b45f0e777604fdbaf880146de2feb4c).
    Call this **itap**.

2.  If **itap** is zero, then this paragraph is not in a table row.
    Leave the algorithm.

Given a character position **cp** known to be at table depth **itap**,
which is greater than 0, follow this procedure to determine the
character position of the TTP mark of the row that contains **cp**.

1.  Determine the character position of the last character in the
    paragraph that contains **cp**, as specified in [Determining
    Paragraph Boundaries](#Section_30461a5be3ad44cda3fe038f86639b13).
    Let this position be called **cpLast**.

2.  Follow the procedure from Direct Paragraph Formatting to find the
    paragraph properties for the paragraph that contains **cpLast**.
    Apply the properties and determine the table depth as specified in
    Overview of Tables. Call this **itap'**. It is invalid for **itap'**
    to be less than **itap**. If **itap'** is less than **itap**, leave
    the algorithm.

3.  If **itap'** is equal to **itap**, determine the text at character
    position **cpLast**, as specified in [Retrieving
    Text](#Section_01d5d8c4cf9c4ef980fd439e763cfe01). If this character
    is a TTP mark as specified in Overview of Tables, then **cpLast** is
    the desired output. Leave the algorithm.

4.  Let **cp** be **cpLast** + 1 and go to step 1.

Given a character position **cp** known to be at table depth **itap**,
which is greater than 0, follow this procedure to determine the
character position of the first character in the innermost table row
that contains **cp**.

1.  Determine the character position of the first character in the
    paragraph that contains **cp** as specified in Determining Paragraph
    Boundaries. Let this character position be called **cpFirst**.

2.  If **cpFirst** is zero, then this is the desired output. Leave the
    algorithm. Negative values for **cpFirst** are invalid. If
    **cpFirst** is negative leave the algorithm.

3.  Let **cpPrev** be **cpFirst** – 1. Follow the procedure from Direct
    Paragraph Formatting to find the paragraph properties for the
    paragraph that contains **cpPrev**. Apply the properties, and
    determine the table depth as specified in Overview of Tables. Call
    this **itapPrev**.

4.  If **itapPrev** is less than **itap**, then **cpFirst** is the
    desired output. Leave the algorithm.

5.  If **itapPrev** is equal to **itap**, determine the text at
    character position **cpPrev**, as specified in Retrieving Text. If
    this character is a TTP mark as specified in Overview of Tables,
    then **cpFirst** is the desired output. Leave the algorithm.

6.  Set **cp** to **cpPrev**. Go to step 1.

### Applying Properties

This section specifies algorithms for determining the properties of
text, paragraphs, lists, and tables. The final two subsections
([Determining Properties of a
Style](#Section_9258b41cff0a4c96a3a9610664dabbeb) and [Determining
Formatting Properties](#Section_d8b661231a3d4e0694c55ab16e9b6417))
specify the order in which the arrays of [Prl](#prl)s are combined to
compute the final property set. Recall from section
[2.2.5](#Section_9ac56e2984884b0aa00986a26e2f175e) (Property Storage)
that it is valid for multiple Prls to modify the same property. In this
event, the last Prl applied determines the value of that property,
unless otherwise specified in the specification of a particular
[Sprm](#sprm). Thus, an application MUST process the arrays of Prls in
the order specified in section 2.4.6.6, Determining Formatting
Properties, to arrive at the correct property set.

Recall also from section 2.2.5 (Property Storage) that a Prl
MAY<span id="Appendix_A_Target_10"
class="anchor"></span>[\<10\>](#Appendix_A_10) be ignored by
applications that do not support the features represented by the Prl.

#### Direct Paragraph Formatting

This section explains how to find the properties applied directly (as
opposed to through a style, for example) to a paragraph, given a
[character position](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) **cp**
within it. The properties are found as an array of [**Prl**](#prl)
elements.

1.  Follow the algorithm from [Determining Paragraph
    Boundaries](#Section_30461a5be3ad44cda3fe038f86639b13) for finding
    the character position of the last character in the paragraph to
    completion. From step 5, remember the [**PapxFkp**](#papxfkp) and
    *k*. From step 4, remember the offset in the [WordDocument
    Stream](#Section_d7fae142670d4cd5869a708366984a71) at which
    **PapxFkp** was read. Let this offset be called **of**. From step 2
    remember the [**Pcd**](#pcd). If the algorithm from Determining
    Paragraph Boundaries specifies that **cp** is invalid, leave the
    algorithm.

2.  Find a [**BxPap**](#bxpap) at **PapxFkp**.**rgbx\[***k***\]**. Find
    a [**PapxInFkp**](#papxinfkp) at offset **of** +
    2\***BxPap.bOffset**

3.  Find a [**GrpprlAndIstd**](#grpprlandistd) in the **PapxInFkp** from
    step 2. The offset and size of the **GrpprlAndIstd** is instructed
    by the first byte of the **PapxInFkp**, as detailed at
    **PapxInFkp**.

4.  Find the **grpprl** within the **GrpprlAndIstd**. This is an array
    of **Prl** elements that specifies the direct properties of this
    paragraph.

5.  Finally **Pcd.[Prm](#prm)** specifies further property modifications
    that apply to this paragraph. If **Pcd**.**Prm** is a
    [**Prm0**](#prm0) and the [**Sprm**](#sprm) specified within
    **Prm0** modifies a paragraph property, append to the array of
    **Prl** elements from the previous step a single **Prl** made of the
    **Sprm** and value in **Prm0**. if **Pcd**.**Prm** is a
    [**Prm1**](#prm1), append to the array of **Prl** elements from the
    previous step any **Sprm** structures that modify paragraph
    properties within the array of **Prl** elements specified by
    **Prm1**.

#### Direct Character Formatting

This section specifies how to find the properties applied directly to a
given [character position](#Section_a3d44e167d2946f7bb7bd0d8a5734f83)
**cp**. The result will be an array of [**Prl**](#prl) elements that
specify the property modifications to be applied.

Additional formatting and properties can affect that **cp** as well, if
a style is applied. To determine the full set of properties, including
those from styles, see section
[2.4.6.6](#Section_d8b661231a3d4e0694c55ab16e9b6417) Determining
Formatting Properties.

1.  Follow the algorithm from [Retrieving
    Text](#Section_01d5d8c4cf9c4ef980fd439e763cfe01). From step 5 or 6,
    determine the offset in the [WordDocument
    Stream](#Section_d7fae142670d4cd5869a708366984a71) where text was
    found. Call this offset **fc**. Also remember from step 4, the
    [Pcd](#pcd). If the algorithm from Retrieving Text specifies **cp**
    is invalid, leave the algorithm.

2.  Read a [PlcBteChpx](#plcbtechpx) at offset
    [FibRgFcLcb97](#fibrgfclcb97).**fcPlcfBteChpx** in the [Table
    Stream](#Section_44f62054d9114989946ca42100c26a15), and of size
    FibRgFcLcb97.**lcbPlcfBteChpx**.

3.  Find the largest *i* such that plcbteChpx**.aFc**\[*i*\] ≤ **fc**.
    If the last element of plcbteChpx**.aFc** is less than or equal to
    **fc**, then **cp** is outside the range of character positions in
    this document, and is not valid. Read a [ChpxFkp](#chpxfkp) at
    offset **aPnBteChpx**\[*i*\]**.pn** \*512 in the WordDocument
    Stream.

4.  Find the largest *j* such that ChpxFkp**.rgfc\[***j***\]** ≤ **fc**.
    If the last element of ChpxFkp**.rgfc** is less than or equal to
    **fc**, then **cp** is outside the range of character positions in
    this document, and is not valid. Find a [Chpx](#chpx) at offset
    ChpxFkp.**rgb**\[*i*\] in ChpxFkp.

5.  The **grpprl** within the Chpx is an array of Prls that specifies
    the direct properties of this character.

6.  Additionally, apply Pcd**.**[Prm](#prm) which specifies additional
    properties for this text. If Pcd.Prm is a [Prm0](#prm0) and the
    [Sprm](#sprm) specified within Prm0 modifies a character property (a
    Sprm with an **sgc** value of 2), append a single Prl made of the
    Sprm and value in that Prm0 to the array of Prls from the previous
    step. If Pcd.Prm is a [Prm1](#prm1), append any Sprms that modify
    character properties from the array of Prls specified by Prm1.

#### Determining List Formatting of a Paragraph

A list in an MS-DOC file consists of one or more paragraphs. Each
paragraph in a list has a nonzero **iLfo** property (see
[sprmPIlfo](#paragraph-properties)) and an **iLvl** property (see
sprmPIlvl), which are used to determine the information that is
necessary to format the paragraph as a member in a specific list.
Paragraphs that share the same **iLfo** property, and exist in a range
of text that constitutes a [Valid
Selection](#Section_8d8fece5bdbc42588457916540075e3f), are considered to
be part of the same list. Paragraphs in a list do not need to be
consecutive, and a list can overlap with other lists. This section
describes an algorithm to add list formatting to a paragraph containing
a given [character position](#Section_a3d44e167d2946f7bb7bd0d8a5734f83).

Given character position **cp**, use the following three-part algorithm
to add list formatting to the paragraph containing **cp**.

**Part 1**

1.  Follow the procedure for determining formatting properties, as
    specified in section
    [2.4.6.6](#Section_d8b661231a3d4e0694c55ab16e9b6417), to find the
    paragraph properties for the paragraph that **cp** belongs to.

2.  Let *iLfoCur* and *iLvlCur* be the **iLfo** (see sprmPIlfo) and
    **iLvl** (see sprmPIlvl) properties of the paragraph, respectively.
    If *iLfoCur* is zero, the paragraph is not part of a list, and the
    algorithm ends.

3.  Let **lfo** be the [LFO](#lfo) at
    [PlfLfo](#plflfo).**rgLfo**\[*iLfoCur* -1\]. If there is no such
    LFO, the file is invalid and the algorithm ends.

4.  Let **lstf** be the [LSTF](#lstf) in [PlfLst](#plflst).**rgLstf**
    such that **lstf**.**lsid** equals **lfo**.**lsid**. If there is no
    such LSTF, the file is invalid and the algorithm ends.

5.  Let **lfodata** be the [LFOData](#lfodata) at
    PlfLfo.**rgLfoData**\[*iLfoCur* -1\].

6.  Let **lfolvl** be the [LFOLVL](#lfolvl) in **lfodata**.**rgLfoLvl**
    such that **lfolvl**.**iLvl** equals *iLvlCur*, if such an LFOLVL
    exists. If there is no such LFOLVL, go to part 1 step 8.

7.  If **lfolvl**.**fFormatting** is nonzero, let **lvl** be
    **lfolvl.lvl** and go to part 2 step 1.

8.  Let *i* be 0. For each LSTF in PlfLst.**rgLstf** prior to **lstf**,
    if LSTF.**fSimpleList** is zero, let *i* = *i* + 9, if
    LSTF.**fSimpleList** is nonzero, let *i* be *i* + 1.

9.  Let *i* be *i* + *iLvlCur*.

10. Let **lvl** be the *i*<sup>th</sup> [LVL](#lvl) in the array of LVLs
    appended to PlfLst (see the **fcPlfLst** field of
    [FibRgFcLcb97](#fibrgfclcb97)).

**Part 2**

After the **lstf** and **lvl** are determined, the next step is to
determine the number text of the paragraph.

1.  Let *xstNumberText* be a copy of **lvl.xst**.

2.  If **lvl.lvlf.nfc** is not equal to 0x17, go to part 2 step 4. If
    **lvl.lvlf.nfc** is equal to 0x17, the paragraph is in a bulleted
    level.

3.  Let *xchBullet* be the 16-bit character at
    *xstNumberText***.rgtchar**\[0\]. If *xchBullet* & 0xF000 is
    nonzero, let *xstNumberText***.rgtchar**\[0\] equal *xchBullet* &
    0x0FFF. Go to part 3 step 1.

4.  For each entry *j* in **lvl**.**lvlf**.**rgbxchNums** such that
    **lvl**.**lvlf**.**rgbxchNums**\[*j*\] is nonzero, let *iLvlTemp* be
    the 16-bit integer stored at
    **lvl**.**xst.rgtchar**\[**lvl**.**lvlf**.**rgbxchNums**\[*j*\] -
    1\]. If *iLvlTemp* == *iLvlCur*, replace the *iLvlTemp* placeholder
    in *xstNumberText* with the [level
    number](#Section_361e48e1ae564b62a95001664b2cc006) of the current
    paragraph. If *iLvlTemp* \< *iLvlCur*, replace the *iLvlTemp*
    placeholder in *xstNumberText* with the level number of the closest
    previous paragraph in the list that has an **iLvl** property that
    equals *iLvlTemp*. If *iLvlTemp* \> *iLvlCur*, the file is invalid
    and the algorithm ends. If **lvl.lvlf.fLegal** is nonzero, each of
    these level numbers MUST be reformatted as according to the
    **fLegal** field description in [LVLF](#lvlf) before they replace
    their respective placeholders.

**Part 3**

After the number text of the paragraphs is determined, the final step is
to format the paragraph and the number text.

1.  If **lstf**.**rgistdPara**\[*iLvlCur*\] != 0x0FFF, apply the style
    specified by **lstf**.**rgistdPara**\[*iLvlCur*\] to both the
    paragraph and *xstNumberText*.

2.  Apply the character properties specified by **lvl**.**grpprlChpx**
    to *xstNumberText*.

3.  Append the character specified by **lvl**.**lvlf**.**ixchFollow** to
    *xstNumberText*. *xstNumberText* is now the number text that will be
    displayed at the beginning of the paragraph.

4.  Apply the paragraph properties specified by **lvl**.**grpprlPapx**
    to the paragraph, including *xstNumberText*.

5.  Justify only the *xstNumberText* according to the justification
    specified by **lvl**.**lvlf**.**jc**.

The paragraph is now formatted as part of a list.

#### Determining Level Number of a Paragraph

The level number of a paragraph is the number in the number sequence of
the level that corresponds to that paragraph, formatted according to an
MSONFC (as specified in
[\[MS-OSHARED\]](%5bMS-OSHARED%5d.pdf#Section_d93502fa5b8f4f47a3fe5574046f4b8d)
section 2.2.1.3). The number sequence of a level begins at a specified
value and increments by 1 for each paragraph in the level. Also, the
number sequence of a level can restart when certain other levels are
encountered. See the specification of [LVLF](#lvlf) for more
information. This section describes an algorithm to determine the level
number of a paragraph containing a given [character
position](#Section_a3d44e167d2946f7bb7bd0d8a5734f83).

Given character position **cp**, use the following algorithm to
determine the level number of the paragraph containing **cp**:

1.  Follow steps 1 thru 10 of [Determining List Formatting of a
    Paragraph](#Section_1a0bc623211f44f6828b51993f16e586) to get the
    *iLvlCur*, **lvl** that correspond to the paragraph that **cp**
    belongs to. Also let *lsidCur* be **lfo.lsid** from step 4 of that
    algorithm.

2.  Let *nfcCur* be **lvl.lvlf.nfc**. If *nfcCur* is equal to 0xFF or
    0x17, this level has no number sequence, and the level number of the
    paragraph is an empty string. In this case, let *xsLevelNumber* be
    an empty string, and the algorithm ends.

3.  Let *iStartAt* be **lvl.lvlf.iStartAt**.

4.  If **lvl.lvlf.fNoRestart** is nonzero, let *iLvlRestartLim* be
    **lvl.lvlf.iLvlRestartLim**. Otherwise, let *iLvlRestartLim* be
    *iLvlCur*.

5.  Let *numCur* be *iStartAt*.

6.  For each paragraph *p* that has a nonzero **iLfo** property and that
    is in the same [Valid
    Selection](#Section_8d8fece5bdbc42588457916540075e3f) as **cp**,
    beginning with the paragraph starting at the lowest character
    position up to but not including the paragraph containing **cp**,
    carry out steps 7 to 12 below.

7.  Determine **lfo.lsid** and **lfolvl** for paragraph *p* using steps
    1 through 6 of Determining List Formatting of a Paragraph. If
    **lfo.lsid** is not equal to *lsidCur*, continue to the next
    paragraph.

8.  If the **iLvl** property of the paragraph *p* is less than
    *iLvlRestartNum*, let *numCur* by *iStartAt*.

9.  If the **iLvl** property of the paragraph *p* is not equal to
    *iLvlCur*, continue to the next paragraph.

10. If the value of the **iLfo** property of the paragraph *p* has not
    been encountered before in the execution of this algorithm and
    **lvolvl.fStartAt** is nonzero, then let *numCur* be
    **lfolvl.iStartAt** and continue to the next paragraph.

11. Let *numCur* be *numCur* + 1.

12. If the paragraph *p* does not contain **cp**, return to step 6.

13. Let *xsLevelNumber* be a string containing the number specified by
    *numCur* formatted according to the MSONFC (as specified in
    \[MS-OSHARED\] section 2.2.1.3) specified by *nfcCur*.

*xsLevelNumber* is now the level number of the paragraph.

#### Determining Properties of a Style

This section specifies an algorithm to determine the set of properties
to apply to text, a paragraph, a table, or a list when a particular
style is applied to it. Given an **istd**, one or more arrays of
[**Prl**](#prl) can be derived that express the differences from
defaults for this style. Depending on its **stk**, a style can specify
properties for any combination of tables, paragraphs, and characters.

Given an **istd**:

1.  Read the [**FIB**](#fib) from offset zero in the [WordDocument
    Stream](#Section_d7fae142670d4cd5869a708366984a71).

2.  All versions of the **FIB** contain exactly one
    **[FibRgFcLcb97](#fibrgfclcb97)** though it can be nested in a
    larger structure. Read a [**STSH**](#stsh) from offset
    **FibRgFcLcb97.fcStshf** in the [Table
    Stream](#Section_44f62054d9114989946ca42100c26a15) with size
    **FibRgFcLcb97.lcbStshf**.

3.  The given **istd** is a zero-based index into **STSH.rglpstd**. Read
    an [**LPStd**](#lpstd) at **STSH.rglpstd**\[**istd**\].

4.  Read the [**STD**](#std) structure as **LPStd**.**std**, of length
    **LPStd**.**cbStd** bytes.

5.  From the **STD.stdf**.**stdfBase** obtain **istdBase**. If
    **istdBase** is any value other than 0x0FFF, then this style is
    based on another style. Recursively apply this algorithm using
    **istdBase** as the starting **istd** to obtain one or more arrays
    of **Prl**s as the properties for tables, paragraphs and characters
    from the base style.

6.  From the **STD.stdf**.**stdfBase** obtain **stk**. For more
    information, see the description of the **cupx** member of
    [**StdfBase**](#stdfbase). Read an **STD.grLPUpxSw**. Based on the
    **stk**, **grLPUpxSw** contains one of the following structures:
    [StkParaGRLPUPX](#stkparagrlpupx),
    [StkCharGRLPUPX](#stkchargrlpupx),
    [StkTableGRLPUPX](#stktablegrlpupx),
    [StkListGRLPUPX](#stklistgrlpupx).

7.  Each of the preceding structures contains one or more of the
    following: [LPUpxPapx](#lpupxpapx), [LPUpxChpx](#lpupxchpx),
    [LPUpxTapx](#lpupxtapx). Each of the latter structures leads to one
    or more arrays of **Prl** that specify properties. For more
    information, see the sections documenting these structures for how
    to obtain these arrays.

8.  For each array obtained in step 7 that specifies properties of a
    table, paragraph, or characters, append to the beginning of the
    corresponding array from step 5, if any. The resulting arrays of
    **Prl** are the desired output. Leave the algorithm.

#### Determining Formatting Properties

This section specifies an algorithm for how to combine properties from
various sources that influence the properties of a [character
position](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) to obtain the final
formatting.

Character, paragraph, and table properties of the text at any given
character position are specified by lists of differences from the
defaults. [Property Storage](#Section_9ac56e2984884b0aa00986a26e2f175e)
explains how to determine defaults and how to apply property
differences. This section further specifies which lists of property
differences are applicable and the order in which they apply.

In general, the differences from defaults are specified by one or more
styles as well as any directly applied property modifications. Multiple
styles can influence the properties at a given character position. A
table style, for example, can specify paragraph properties that apply to
some or all paragraphs within that table. A paragraph in such a table
can itself have a paragraph style, in which case two different lists of
differences modify the properties of said paragraph.

Given character position **cp**, use the following algorithm to
determine the properties of text at **cp**:

Part 1:

1.  Determine defaults for all properties the application is interested
    in. For further specification, see Property Storage.

2.  Split the properties into three groups based on the objects they
    apply to: paragraph properties, character properties, and table
    properties as specified by [Single Property
    Modifies](#Section_4fae38be499347d2b82c8f32e4ab9ff0). These are the
    set of properties which will be modified throughout the algorithm to
    arrive at the desired properties.

3.  All versions of the [**FIB**](#fib) contain exactly one
    [**FibRgFcLcb97**](#fibrgfclcb97) though it can be nested in a
    larger structure. Read an [**STSH**](#stsh) from offset
    **FibRgFcLcb97.fcStshf** in the [Table
    Stream](#Section_44f62054d9114989946ca42100c26a15), with size
    **FibRgFcLcb97.lcbStshf**. From the **STSH**, obtain an
    [LPStshi](#lpstshi) and from that obtain an [**STSHI**](#stshi).

4.  Apply the property modifications specified by the **ftcAsci**,
    **ftcFE** and **ftcOther** members of the
    **STSHI.[Stshif](#stshif)** along with the **ftcBi** member of
    **STSHI** if specified.

5.  Determine whether **cp** is in a table or not. For further
    specification, see [Determining Cell
    Boundaries](#Section_e32f7b2f47594e8f9ef9e0cdfd11a335). If **cp** is
    not in a table, go to step 1 of part 2.

6.  Determine the table style that is applied to the innermost row that
    contains **cp** as follows:

    1.  Apply the algorithm from [Determining Row
        Boundaries](#Section_8eebe8176c3b490d869530c799cc2367) to obtain
        the character position of the TTP mark of the innermost row that
        contains **cp**. Call this **cpTtp**.

    2.  Apply the algorithm from [Direct Paragraph
        Formatting](#Section_61b635c32c444155bf17fec281b30c71) on
        **cpTtp**.

    3.  Apply the array of [**Prl**](#prl) elements that was obtained to
        the table row and determine the **istd** of the table style
        applied to this table row using [sprmTIstd](#table-properties).
        Call it **istdTable**. If no table style is applied, go to step
        1 of part 2.

7.  Using the algorithm from [Determining Properties of a
    Style](#Section_9258b41cff0a4c96a3a9610664dabbeb), obtain a
    **grpprlPapx**, **grpprlChpx**, and a **grpprlTapx** (if available)
    from the **istdTable**. Apply any property modifications specified
    in **grpprlChpx**, **grpprlPapx**, and **grpprlTapx** to the
    character, paragraph, and table properties, respectively.

8.  Find the position of the innermost cell that contains **cp** within
    the innermost table that contains **cp** by applying the algorithm
    from Determining Row Boundaries and Determining Cell Boundaries as
    appropriate. Specifically, determine if the innermost cell that
    contains **cp** belongs to the first row, first column, last row, or
    last column of the innermost table that contains **cp**. Also,
    determine whether the innermost cell that contains **cp** is in an
    even or an odd [**horizontal
    band**](#gt_29e4e1ad-bba7-40a0-81f6-f7ad1df73cf4) based on
    horizontal banding applied in **grpprlTapx** with sprmTCHorzBands
    and, similarly, if it is in an even or an odd [**vertical
    band**](#gt_a7a55b00-92d1-40a8-b207-6b7c02bb183c) based on vertical
    banding applied in **grpprlTapx** with sprmTCVertBands. Note that if
    sprmTTlp.**grfatl** specifies that the top row of the table receives
    special formatting, then the top row of the table and any row with
    sprmTTableHeader applied with a value of 0x01 is not counted when
    determining odd or even horizontal banding. Similarly, if
    sprmTTlp.**grfatl** specifies that the logically leftmost column of
    the table receives special formatting, then that column is not
    counted when determining odd or even vertical banding.

9.  Next, using the array of Prls obtained in step 6, determine if
    additional property differences need to be applied to **cp** based
    on its location in the table as specified by sprmTTlp.**grfatl**. If
    additional property differences need to be applied, look for
    [sprmPCnf](#paragraph-properties)s within the **grpprlPapx** from
    step 7, [sprmCCnf](#character-properties)s within **grpprlChpx**
    from step 7, and sprmTCnfs within **grpprlTapx** from step 7 whose
    CNFC, see [CNFOperand](#cnfoperand).**cnfc**, matches the position
    information found in step 8. The following table specifies which
    CNFC values match which position information.

| CNFC Value | Matches …                                                                                                                                                                                                                                             |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0x0001     | Any cell in the top row or with sprmTTableHeader applied with a value of 0x01 if sprmTTlp.**grfatl** specifies that top row of the table receives special formatting.                                                                                 |
| 0x0002     | Any cell in the bottom row if sprmTTlp.**grfatl** specifies that bottom row of the table receives special formatting and the cell does not match CNFC value 0x0001.                                                                                   |
| 0x0004     | Any cell in the logically leftmost column if sprmTTlp.**grfatl** specifies that the logically leftmost column receives special formatting.                                                                                                            |
| 0x0008     | Any cell in the logically rightmost column if sprmTTlp.**grfatl** specifies that the logically rightmost column receives special formatting and the cell does not match CNFC value 0x0004.                                                            |
| 0x0010     | Any cell in an odd numbered vertical band if sprmTTlp.**grfatl** specifies that odd numbered vertical bands receive special formatting and the cell does not match CNFC values 0x0004 or 0x0008.                                                      |
| 0x0020     | Any cell in an even numbered vertical band if sprmTTlp.**grfatl** specifies that even numbered vertical bands receive special formatting, and the cell does not match CNFC values 0x0004 or 0x0008.                                                   |
| 0x0040     | Any cell in an odd numbered horizontal band if sprmTTlp.**grfatl** specifies that odd numbered horizontal bands receive special formatting, and the cell does not match CNFC values 0x0001 or 0x0002.                                                 |
| 0x0080     | Any cell in an even numbered horizontal band if sprmTTlp.**grfatl** specifies that even numbered horizontal bands receive special formatting, and the cell does not match CNFC values 0x0001 or 0x0002.                                               |
| 0x0100     | The logically rightmost cell on the top row of the table if sprmTTlp.**grfatl** specifies that both the top row and the logically rightmost column receive special formatting and the cell does not match CNFC value 0x200.                           |
| 0x0200     | The logically leftmost cell on the top row of the table if sprmTTlp.**grfatl** specifies that both the top row and the logically leftmost column receive special formatting.                                                                          |
| 0x0400     | The logically rightmost cell on the bottom row of the table if sprmTTlp.**grfatl** specifies that both the bottom row and the logically rightmost column receive special formatting and the cell does not match CNFC value 0x0100, 0x0200, or 0x0800. |
| 0x0800     | The logically leftmost cell on the bottom row of the table if sprmTTlp.**grfatl** specifies that both the bottom row and the logically leftmost column receive special formatting and the cell does not match CNFC value 0x0100 or 0x0200.            |

> A single cell position can match multiple CNFC values. For example the
> logically rightmost cell on the top row could match all of these CNFC
> values: 0x0100, 0x0008, 0x0001. Apply conditional formatting in the
> following order.

| CNFC Values                       | Conditional Formatting Type    |
|-----------------------------------|--------------------------------|
| 0x0040 or 0x0080                  | Odd or even horizontal banding |
| 0x0010 or 0x0020                  | Odd or even vertical banding   |
| 0x0004 or 0x0008                  | First or last column           |
| 0x0001 or 0x0002                  | First or last row              |
| 0x0100, 0x0200, 0x0400, or 0x0800 | Corner cell                    |

Apply any property modifications specified in a matching sprmCCnf, if
one exists, to the character properties. Apply any property
modifications specified in a matching sprmPCnf, if one exists, to
paragraph properties. Apply any property modifications specified in a
matching sprmTCnf, if one exists, to table properties.

Part 2:

1.  Apply the algorithm from Direct Paragraph Formatting up to and
    including step 4. The remaining steps of that algorithm are applied
    later. Obtain [**GrpprlAndIstd**](#grpprlandistd). Using the
    algorithm from Determining Properties of a Style, obtain any
    paragraph property modifications that are specified by
    **GrpprlAndIstd**.**istd**.

2.  Apply any paragraph property modifications obtained from
    **GrpprlAndIstd**.**istd** in the previous step. Next, apply any
    paragraph property modifications found in
    **GrpprlAndIstd**.**grpprl**. Finally, finish the remaining steps in
    the algorithm from Direct Paragraph Formatting that was started in
    the previous step.

3.  If the paragraph that contains **cp** belongs to a list, apply any
    further paragraph property modifications specified by the list. For
    information about how to determine whether a paragraph belongs to a
    list and how to obtain the property modifications specified by the
    list, see [Determining List Formatting of a
    Paragraph](#Section_1a0bc623211f44f6828b51993f16e586). At this point
    the paragraph properties reflect those of the paragraph that
    contains **cp**. The remaining steps determine the character
    properties.

4.  Using the algorithm from Determining Properties of a Style, obtain
    any character property modifications specified by
    **GrpprlAndIstd**.**istd** from step 1 of part 2 or the value of the
    last sprmPIstdPermute if any in **GrpprlAndIstd**.**grpprl**. Apply
    any character property modifications obtained from the style to the
    character properties.

5.  Finally, using the algorithm from [Direct Character
    Formatting](#Section_be58bf9cd1d340cc91ee36452d7939b2), obtain any
    property modifications to be applied to character properties and
    apply them.

### Application Data For VtHyperlink

The following algorithm specifies how hyperlink properties, as specified
in
[\[MS-OSHARED\]](%5bMS-OSHARED%5d.pdf#Section_d93502fa5b8f4f47a3fe5574046f4b8d)
section 2.3.3.1.18, are associated with content in a document construct
their **dwApp** field value.

- If the hyperlink is associated with an OfficeArtFSP shape, as
  specified in
  [\[MS-ODRAW\]](%5bMS-ODRAW%5d.pdf#Section_8560795e77594745838ff7f2ef2f1872)
  section 2.2.40, the **dwApp** value MUST be 0xFFFFFFFF. Otherwise the
  hyperlink MUST be associated with a picture, an external link to a
  picture source, or other document content.

- If the hyperlink is associated directly with a picture, as opposed to
  the hyperlink field associated with the picture, or an external link
  to a picture source, the **dwApp** value MUST be set to an
  [FcCompressed](#fccompressed) structure that specifies the starting
  offset of the *field result* in the [WordDocument
  Stream](#Section_d7fae142670d4cd5869a708366984a71) associated with the
  picture. For further specification on *field results*, see
  [**Plcfld**](#plcfld).

- If the hyperlink is associated with any other type of document
  content, including the hyperlink field of a WordArt shape or picture,
  the **dwApp** value MUST be set to an unsigned 4-byte integer that
  specifies the index into a **Plcfld**. The specified **Plcfld** item
  corresponds to the field begin character of the hyperlink field in the
  document content associated with the hyperlink property.  
    
  The hyperlink properties that have **dwApp** set to an index into a
  **Plcfld** MUST conform to a specific ordering relative to each other
  when written. They MUST be written within the property set hyperlink
  property array **VtHyperlinks**, as specified in \[MS-OSHARED\]
  section 2.3.3.1.21, grouped according to the document **Plcfld** to
  which the indices apply, in the following order:

1.  [Main Document](#Section_f426d9a2004d418e8d8ce7fd88e7c48e) links.

2.  [Footnote Document](#Section_f7e96a05aad74acba06dbfa430ac1fcc)
    links.

3.  [Header Document](#Section_8465bee76c7945a9812e58b0c5fd6cdc) links.

4.  [Comment Document](#Section_486f5a89fba5412f8ac61c551654ddcd) links.

5.  [Endnote Document](#Section_13659f756a694a5f8e035f9bced90faa) links.

6.  [Textbox Document](#Section_f87b35602c234d109751ff141d307308) links.

7.  [Header Textbox Document](#Section_7392319674e14e6988b8d2cc9ac8093b)
    links.

> Within these groupings the hyperlink properties MUST be ordered from
> largest index to smallest index.
>
> Example:
>
> A document contains two hyperlink fields in the Main Document, and two
> hyperlink fields in the Footnote Document. The field indices for the
> hyperlinks (h1M, and h2M) in the Main Document are 1 and 4
> respectively. The field indices for the hyperlinks (h1F, and h2F) in
> the Footnote Document are 0 and 3 respectively.
>
> The hyperlink properties in this example MUST be written in the order:
> h2M, h1M, h2F, h1F.
