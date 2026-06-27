# Structure Examples

## Example of a List

The following is an example of a list. It demonstrates how [LFO](#lfo)
structures, [LSTF](#lstf) structures, and [LVL](#lvl) structures define
the list formatting of a paragraph. See [Determining List
Formatting](#Section_1a0bc623211f44f6828b51993f16e586) for information
about how a paragraph is related to these structures.

| **Offset** | **Size** | **Structure**                                 | **Value**  |
|------------|----------|-----------------------------------------------|------------|
| 0000009A   | 02E8     | [FibRgFcLcb97](#fibrgfclcb97) **- rgFcLcb97** |            |
| 0000009A   | 0108     | ... (omitted for brevity)                     |            |
| 000002E2   | 0004     | ULONG **- fcPlfLst**                          | 0x00000536 |
| 000002E6   | 0004     | ULONG **- lcbPlfLst**                         | 0x0000001E |
| 000002EA   | 0004     | ULONG **- fcPlfLfo**                          | 0x000007E1 |
| 000002EE   | 0004     | ULONG **- lcbPlfLfo**                         | 0x00000018 |
| 000002F2   | 01D8     | ... (omitted for brevity)                     |            |

Figure 55: Portions of the FibRgFcLcb97 structure, highlighting the two
fc/lcb pairs used for lists

As with all Word Binary files, this file has a [Fib](#fib) at offset
zero in the [WordDocument
Stream](#Section_d7fae142670d4cd5869a708366984a71). The preceding table
shows a portion of the FibRgFcLcb97 that is contained in that **Fib**.
The FibRgFcLcb97 is very large. Most fields have been omitted here for
brevity.

**fcPlfLst:** A value of 0x00000536 specifies the offset, in bytes, of a
location in the [Table
Stream](#Section_44f62054d9114989946ca42100c26a15). A
[**PlfLst**](#plflst) containing list formatting information begins at
this offset. An array of **LVL** structures is directly appended to the
**PlfLst**. The offset, in bytes, of the array of **LVL** structures in
the Table Stream is equal to **fcPlfLst + lcbPlfLst**, which in this
case is 0x00000554.

**lcbPlfLst:** A value of 0x0000001E specifies the size, in bytes, of
the **PlfLst** at offset 0x00000536 in the Table Stream. This does not
account for the size of the array of **LVL** structures that is appended
to the **PlfLst**. The size of the array of **LVL**s cannot be
determined without reading each **LVL**, as each **LVL** is of a
variable size that can only be determined by reading that **LVL**. The
number of **LVL** structures in the array, however, is equal to ((number
of **LSTF**s in **PlfLst** such that **lstf.fSimpleList** is equal
to 1) + (number of **LSTF**s in **PlfLst** such that
**lstf.fSimpleList** is equal to zero) \* 9), which in this case is 9.

**fcPlfLfo:** A value of 0x000007E1 specifies the offset, in bytes, of a
location in the Table Stream. A [**PlfLfo**](#plflfo) containing list
format override information begins at this offset.

**lcbPlfLfo:** A value of 0x00000018 specifies the size, in bytes, of
the PlfLfo at offset 0x000007E1 in the Table Stream.

The following table shows the expansion of the **PlfLst** at offset
0x00000536 in the Table Stream.

| **Offset** | **Size** | **Structure**              | **Value** |
|------------|----------|----------------------------|-----------|
| 00000536   | 001E     | PlfLst **- PlfLst**        |           |
| 00000536   | 0002     | SHORT **- cLst**           | 0x0001    |
| 00000538   | 001C     | Array of LSTF **- rgLstf** |           |
| 00000538   | 001C     | LSTF **- lstf\[0\]**       |           |

Figure 56: Expansion of a PlfLst

In this particular example, there is only one list definition stored in
the document, so **rgLstf** contains only one **LSTF**. It is common for
**rgLstf** to contain multiple **LSTF** structures.

**cLst:** 0x0001 specifies that **rgLstf** contains one **LSTF**.

**rgLstf:** An array that contains the **LSTF** that is stored in the
document.

**rgLstf.lstf\[0\]:** An **LSTF** that defines formatting of a list.

The following table shows the expansion of **rgLstf.lstf\[0\]** in the
**PlfLst** at offset 0x00000536 in the Table Stream.

| **Offset** | **Size** | **Structure**                   | **Value**  |
|------------|----------|---------------------------------|------------|
| 00000538   | 001C     | LSTF **- lstf\[0\]**            |            |
| 00000538   | 0004     | LONG **- lsid**                 | 0x44F53D09 |
| 0000053C   | 0004     | LONG **- tplc**                 | 0x31200A2C |
| 00000540   | 0012     | Array of SHORT **- rgistdPara** |            |
| 00000540   | 0002     | SHORT **- istdPara\[0\]**       | 0x0FFF     |
| 00000542   | 000E     | ... (omitted for brevity)       |            |
| 00000550   | 0002     | SHORT **- istdPara\[8\]**       | 0x0FFF     |
| 00000552   | 1 bit    | BYTE **- fSimpleList**          | 0x0        |
| 00000552   | 1 bit    | BYTE **- unused1**              | 0x0        |
| 00000552   | 1 bit    | BYTE **- fAutoNum**             | 0x0        |
| 00000552   | 1 bit    | BYTE **- unused2**              | 0x0        |
| 00000552   | 1 bit    | BYTE **- fHybrid**              | 0x0        |
| 00000552   | 3 bits   | BYTE **- reserved1**            | 0x0        |
| 00000553   | 0001     | [grfhic](#grfhic) **- grfhic**  |            |

Figure 57: Expansion of an LSTF

**lsid:** A value of 0x44F53D09 specifies a unique list identifier.
**LFO** structures used these unique identifier to refer to specific
**LSTF** structures. The **lfo\[0\].lsid** in the **PlfLfo** at the
offset 0x000007E1 is equal to this value, which means that **lfo\[0\]**
corresponds to this particular **LSTF**.

**tplc:** 0x31200A2C specifies a value that is used internally by the
list gallery user interface. For purposes of this example, ignore this
value.

**rgistdPara:** Each element is the **istd** of the style which is
linked to the level that corresponds to the index of the element. In
this example, there are no styles linked to any level in the list, so
the value of each element is 0x0FFF, which is common. This contains 9
elements, all but the first and last of which have been omitted for
brevity.

**rgistdPara.istdPara\[0\]:** A value of 0x0FFF specifies that the first
level of this list has no style linked to it.

**rgistdPara.istdPara\[8\]:** A value of 0x0FFF specifies that the ninth
level of this list has no style linked to it.

**fSimpleList:** A value of 0x0 specifies that this list contains 9
levels, and that therefore there are 9 elements in the array of **LVL**
structures at offset 0x00000554 that correspond to this **LSTF**.

**unused1:** A value of 0x0 is ignored.

**fAutoNum:** A value of 0x0 specifies that this list is not used by any
[**field**](#gt_f819dd42-7f44-4613-8231-d5ad47f2bbcc).

**unused2:** A value of 0x0 is ignored.

**fHybrid:** A value of 0x0 specifies that this list is not a [**hybrid
list**](#gt_eaceec1b-55ef-419c-b036-2dbb4958a113).

**reserved1:** A value of 0x0 is ignored.

**grfhic:** This structure contains information that is only useful for
HTML compatibility. This example does not cover list HTML compatibility.

The following table shows the expansion of the array of **LVL**
structures at offset 0x00000554 in the Table Stream.

| **Offset** | **Size** | **Structure**             | **Value** |
|------------|----------|---------------------------|-----------|
| 0000009A   | 028D     | Array of LVL **- rgLvl**  |           |
| 00000554   | 0047     | LVL **- lvl\[0\]**        |           |
| 0000059B   | 004B     | LVL **- lvl\[1\]**        |           |
| 000005E6   | 004B     | LVL **- lvl\[2\]**        |           |
| 00000631   | 01B0     | ... (omitted for brevity) |           |

Figure 58: Expansion of an array of LVLs

As specified by **lstf\[0\].fSimpleList**, this contains 9 **LVL**
structures that correspond to **lstf\[0\]**. If **PlfLst** had more than
just one **LSTF** (as specified by **PlfLst**.**cLst**), this array
would contain the additional **LVL** structures that would correspond to
the extra **LSTF** structures (the number of which would be specified by
the **fSimple** field of those **LSTF**s). The **LVL**s stored in this
array are stored in same order as the **LSTF**s in **PlfLst**. The LVLs
corresponding to each **LSTF** are stored in level order, starting with
the most significant level. For brevity, only the first three **LVL**
structures are included and will be expanded.

**lvl\[0\]:** This **LVL** specifies the level formatting of the first
level in the list.

**lvl\[1\]:** This **LVL** specifies the level formatting of the second
level in the list.

**lvl\[2\]:** This **LVL** specifies the level formatting of the third
level in the list.

The following table shows the expansion of **lvl\[0\]** in the array of
**LVL** structures at offset 0x00000554 in the Table Stream. This
specifies the level formatting of the first level in the list
corresponding to **lstf\[0\]**.

| **Offset** | **Size** | **Structure**                  | **Value**  |
|------------|----------|--------------------------------|------------|
| 00000554   | 0047     | LVL **- lvl\[0\]**             |            |
| 00000554   | 001C     | [LVLF](#lvlf) **- lvlf**       |            |
| 00000554   | 0004     | LONG **- iStartAt**            | 0x00000001 |
| 00000558   | 0001     | MSONFC **- nfc**               | 0x00       |
| 00000559   | 2 bits   | BYTE **- jc**                  | 0x0        |
| 00000559   | 1 bit    | BYTE **- fLegal**              | 0x0        |
| 00000559   | 1 bit    | BYTE **- fNoRestart**          | 0x0        |
| 00000559   | 1 bit    | BYTE **- fIndentSav**          | 0x0        |
| 00000559   | 1 bit    | BYTE **- fConverted**          | 0x0        |
| 00000559   | 1 bit    | BYTE **- unused1**             | 0x0        |
| 00000559   | 1 bit    | BYTE **- fTentative**          | 0x0        |
| 0000055A   | 0009     | Array of BYTE **- rgbxchNums** |            |
| 0000055A   | 0001     | BYTE **- xchNums\[0\]**        | 0x01       |
| 0000055B   | 0001     | BYTE **- xchNums\[1\]**        | 0x00       |
| 0000055C   | 0007     | ... (omitted for brevity)      |            |
| 00000563   | 0001     | BYTE **- ixchFollow**          | 0x00       |
| 00000564   | 0004     | LONG **- dxaIndentSav**        | 0x00000000 |
| 00000568   | 0004     | ULONG **- unused2**            | 0x00000000 |
| 0000056C   | 0001     | BYTE **- cbGrpprlChpx**        | 0x0D       |
| 0000056D   | 0001     | BYTE **- cbGrpprlPapx**        | 0x18       |
| 0000056E   | 0001     | BYTE **- ilvlRestartLim**      | 0x00       |
| 0000056F   | 0001     | grfhic **- grfhic**            |            |
| 00000570   | 0018     | Array of Prl **- grpprlPapx**  |            |
| 00000588   | 000D     | Array of Prl **- grpprlChpx**  |            |
| 00000595   | 0006     | [Xst](#xst) **- xst**          | \0x0000.   |

Figure 59: Expansion of lvl\[0\]

**lvlf.iStartAt:** A value of 0x00000001 specifies that the number
sequence of this level starts at 1.

**lvlf.nfc:** A value of 0x00 specifies that any [level
number](#Section_361e48e1ae564b62a95001664b2cc006) inherited from this
level that replaces a placeholder in the number text of any level (see
the **xst** field of **LVL** for information about placeholders) has
Arabic formatting (for example, 1, 2, 3, 4…), unless otherwise specified
by the **lvlf.fLegal** field of the **LVL** of that level.

**lvlf.jc:** A value of 0x0 specifies that the number text that is
specified by **xst** is left-justified.

**lvlf.fLegal:** A value of 0x0 specifies that this level does not
override the formatting of inherited level numbers.

**lvlf.fNoRestart:** A value of 0x0 specifies that number sequence of
this level restarts after any more significant level. Because this
**LVL** specifies the most significant level, this is ignored.

**lvlf.fIndentSav:** A value of 0x0 specifies that this level does not
need to replace an indent when a paragraph is taken out of the level.

**lvlf.fConverted:** A value of 0x0 specifies that **lvlf.nfc** was not
converted from an old value used for compatibility purposes.

**lvlf.unused1:** A value of 0x0 is ignored.

**lvlf.fTentative:** A value of 0x0 is ignored because this level is not
in a hybrid list, as specified by **lstf\[0\].fHybrid**.

**lvlf.rgbxchNums:** An array that specifies the 1-based indexes of the
placeholders in **xst** (see the **xst** field of **LVL** for
information about placeholders). This array has 9 elements, but it is
zero-terminated. The elements that follow the first terminating zero are
omitted for brevity.

**lvlf.rgbxchNums.xchNums\[0\]:** A value of 0x01 specifies that the
first character in the string which is specified by **xst** is a
placeholder for a level number.

**lvlf.rgbxchNums.xchNums\[1\]:** A value of 0x00 specifies that this
element and those that follow are ignored.

**lvlf.ixchFollow:** A value of 0x00 specifies that a tab immediately
follows the number text which is specified by **xst**.

**lvlf.dxaIndentSav:** A value of 0x00000000 is ignored because
**lvlf.fIndentSav** is zero.

**lvlf.unused2:** A value of 0x00000000 is ignored.

**lvlf.cbGrpprlChpx:** A value of 0x0D specifies that the size of
**grpprlChpx** is 13 bytes.

**lvlf.cbGrpprlPapx:** A value of 0x18 specifies that the size of
**grpprlPapx** is 24 bytes.

**lvlf.ilvlRestartLim:** A value of 0x00 is ignored because
**lvlf.fNoRestart** is zero.

**lvlf.grfhic:** This structure contains information that is only useful
for HTML compatibility. This example does not cover list HTML
compatibility.

**grpprlPapx:** Contains paragraph properties that are applied to the
paragraph after number text is applied to the paragraph. See Determining
List Formatting.

**grpprlChpx:** Contains character properties that are applied to the
number text. See Determining List Formatting.

**xst:** "\0x0000." specifies the number text of the level. '\0x0000' is
a non-printable character, which is actually the integer 0x0000. This
character is a placeholder for the first level in the list. It is the
first character in the string, as specified by
**lvlf.rgbxchNums.xchNums\[0\]**. This placeholder will be replaced by
the current level number of the first level in the list for each
paragraph in this level. The number text for the first paragraph in this
level will be "1.".

The following table shows the expansion of **lvl\[1\]** in the array of
**LVL** structures at offset 0x00000554 in the Table Stream. This
specifies the level formatting of the second level in the list
corresponding to **lstf\[0\]**.

| **Offset** | **Size** | **Structure**                  | **Value**        |
|------------|----------|--------------------------------|------------------|
| 0000059B   | 004B     | LVL **- lvl\[1\]**             |                  |
| 0000059B   | 001C     | LVLF **- lvlf**                |                  |
| 0000059B   | 0004     | LONG **- iStartAt**            | 0x00000003       |
| 0000059F   | 0001     | MSONFC **- nfc**               | 0x04             |
| 000005A0   | 2 bits   | BYTE **- jc**                  | 0x0              |
| 000005A0   | 1 bit    | BYTE **- fLegal**              | 0x0              |
| 000005A0   | 1 bit    | BYTE **- fNoRestart**          | 0x0              |
| 000005A0   | 1 bit    | BYTE **- fIndentSav**          | 0x0              |
| 000005A0   | 1 bit    | BYTE **- fConverted**          | 0x0              |
| 000005A0   | 1 bit    | BYTE **- unused1**             | 0x0              |
| 000005A0   | 1 bit    | BYTE **- fTentative**          | 0x0              |
| 000005A1   | 0009     | Array of BYTE **- rgbxchNums** |                  |
| 000005A1   | 0001     | BYTE **- xchNums\[0\]**        | 0x01             |
| 000005A2   | 0001     | BYTE **- xchNums\[1\]**        | 0x03             |
| 000005A3   | 0001     | BYTE **- xchNums\[2\]**        | 0x00             |
| 000005A4   | 0006     | ... (omitted for brevity)      |                  |
| 000005AA   | 0001     | BYTE **- ixchFollow**          | 0x00             |
| 000005AB   | 0004     | LONG **- dxaIndentSav**        | 0x00000000       |
| 000005AF   | 0004     | ULONG **- unused2**            | 0x00000000       |
| 000005B3   | 0001     | BYTE **- cbGrpprlChpx**        | 0x0D             |
| 000005B4   | 0001     | BYTE **- cbGrpprlPapx**        | 0x18             |
| 000005B5   | 0001     | BYTE **- ilvlRestartLim**      | 0x01             |
| 000005B6   | 0001     | grfhic **- grfhic**            |                  |
| 000005B7   | 0018     | Array of Prl **- grpprlPapx**  |                  |
| 000005CF   | 000D     | Array of Prl **- grpprlChpx**  |                  |
| 000005DC   | 000A     | Xst **- xst**                  | \0x0000-\0x0001) |

Figure 60: Expansion of lvl\[1\]

**lvlf.iStartAt:** A value of 0x00000003 specifies that the number
sequence of this level starts at 3.

**lvlf.nfc:** A value of 0x04 specifies that any level number inherited
from this level that replaces a placeholder in the number text of any
level (see the **xst** field of **LVL** for information about
placeholders) has lowercase letter formatting (for example, a, b, c,
d…), unless otherwise specified by the **lvlf.fLegal** field of the LVL
belonging to that level.

**lvlf.jc:** A value of 0x0 specifies that the number text specified by
**xst** is left-justified.

**lvlf.fLegal:** A value of 0x0 specifies that this level does not
override the formatting of inherited level numbers.

**lvlf.fNoRestart:** A value of 0x0 specifies that the number sequence
of this level restarts after any more significant level. As this **LVL**
represents the second level, this means that the number sequence of this
level restarts after any paragraph that is in the first level of this
same list is encountered.

**lvlf.fIndentSav:** A value of 0x0 specifies that this level does not
need to replace an indent when a paragraph is taken out of the level.

**lvlf.fConverted:** A value of 0x0 specifies that **lvlf.nfc** was not
converted from an old value used for compatibility purposes.

**lvlf.unused1:** A value of 0x0 is ignored.

**lvlf.fTentative:** A value of 0x0 is ignored because this level is not
in a hybrid list, as specified by **lstf\[0\].fHybrid.**

**lvlf.rgbxchNums:** An array that specifies the 1-based indexes of the
placeholders in **xst** (see the **xst** field of LVL). This array has 9
elements, but it is zero-terminated. The elements that follow the first
terminating zero are omitted for brevity.

**lvlf.rgbxchNums.xchNums\[0\]:** A value of 0x01 specifies that the
first character in the string specified by **xst** is a placeholder for
a level number.

**lvlf.rgbxchNums.xchNums\[1\]:** A value of 0x03 specifies that the
third character in the string specified by **xst** is a placeholder for
a level number.

**lvlf.rgbxchNums.xchNums\[2\]:** A value of 0x00 specifies that this
element and those that follow are ignored.

**lvlf.ixchFollow:** A value of 0x00 specifies that a tab immediately
follows the number text that is specified by **xst**.

**lvlf.dxaIndentSav:** A value of 0x00000000 is ignored because
**lvlf.fIndentSav** is zero.

**lvlf.unused2:** A value of 0x00000000 is ignored.

**lvlf.cbGrpprlChpx:** A value of 0x0D specifies that the size of
**grpprlPapx** is 13 bytes.

**lvlf.cbGrpprlPapx:** A value of 0x18 specifies that the size of
**grpprlPapx** is 24 bytes.

**lvlf.ilvlRestartLim:** A value of 0x01 is ignored because
**lvlf.fNoRestart** is zero.

**lvlf.grfhic:** This structure contains information that is only useful
for HTML compatibility. This example does not cover list HTML
compatibility.

**grpprlPapx:** Contains paragraph properties that are applied to the
paragraph after the paragraph receives number text. See Determining List
Formatting.

**grpprlChpx:** Contains character properties that are applied to the
number text. See Determining List Formatting.

**xst:** A value of "\0x0000-\0x0001)" specifies the number text of the
level. '\0x0000' and '\0x0001' are non-printable characters, which are
actually the integers 0x0000 and 0x0001, respectively. These characters
are the placeholders for the first and second levels in the list. These
are placeholders because their indexes are specified in the elements of
**lvlf.rgbxchNums**. These placeholders will be replaced by the current
level numbers of the first and second levels in the list for each
paragraph in this level. The number text for the first paragraph in this
level that is the child of the first paragraph in the first level will
be "1-a)".

The following table shows the expansion of **lvl\[2\]** in the array of
**LVL** structures at offset 0x00000554 in the Table Stream. This
specifies the level formatting of the first level in the list
corresponding to **lstf\[0\]**.

| **Offset** | **Size** | **Structure**                  | **Value**  |
|------------|----------|--------------------------------|------------|
| 000005E6   | 004B     | LVL **- lvl\[2\]**             |            |
| 000005E6   | 001C     | LVLF **- lvlf**                |            |
| 000005E6   | 0004     | LONG **- iStartAt**            | 0x00000001 |
| 000005EA   | 0001     | MSONFC **- nfc**               | 0xFF       |
| 000005EB   | 2 bits   | BYTE **- jc**                  | 0x1        |
| 000005EB   | 1 bit    | BYTE **- fLegal**              | 0x0        |
| 000005EB   | 1 bit    | BYTE **- fNoRestart**          | 0x1        |
| 000005EB   | 1 bit    | BYTE **- fIndentSav**          | 0x0        |
| 000005EB   | 1 bit    | BYTE **- fConverted**          | 0x0        |
| 000005EB   | 1 bit    | BYTE **- unused1**             | 0x0        |
| 000005EB   | 1 bit    | BYTE **- fTentative**          | 0x0        |
| 000005EC   | 0009     | Array of BYTE **- rgbxchNums** |            |
| 000005EC   | 0001     | BYTE **- xchNums\[0\]**        | 0x00       |
| 000005ED   | 0008     | ... (omitted for brevity)      |            |
| 000005F5   | 0001     | BYTE **- ixchFollow**          | 0x01       |
| 000005F6   | 0004     | LONG **- dxaIndentSav**        | 0x00000000 |
| 000005FA   | 0004     | ULONG **- unused2**            | 0x00000000 |
| 000005FE   | 0001     | BYTE **- cbGrpprlChpx**        | 0x0D       |
| 000005FF   | 0001     | BYTE **- cbGrpprlPapx**        | 0x10       |
| 00000600   | 0001     | BYTE **- ilvlRestartLim**      | 0x00       |
| 00000601   | 0001     | grfhic **- grfhic**            |            |
| 00000602   | 0010     | Array of Prl **- grpprlPapx**  |            |
| 00000612   | 000D     | Array of Prl **- grpprlChpx**  |            |
| 0000061F   | 0012     | Xst **- xst**                  | Example:   |

Figure 61: Expansion of lvl\[2\]

This level does not have a number sequence because the number text for
this level does not have a placeholder for this level.

**lvlf.iStartAt:** A value of 0x00000001 is ignored, because this level
does not have a number sequence.

**lvlf.nfc:** A value of 0xFF specifies that this level does not have a
number style.

**lvlf.jc:** A value of 0x1 specifies that the number text specified by
**xst** is center-justified.

**lvlf.fLegal:** A value of 0x0 specifies that this level does not
override the formatting of inherited level numbers.

**lvlf.fNoRestart:** A value of 0x1 is ignored, because this level does
not have a number sequence.

**lvlf.fIndentSav:** A value of 0x0 specifies that this level does not
need to replace an indent when a paragraph is taken out of the level.

**lvlf.fConverted:** A value of 0x0 specifies that **lvlf.nfc** was not
converted from an old value used for compatibility purposes.

**lvlf.unused1:** A value of 0x0 is ignored.

**lvlf.fTentative:** A value of 0x0 is ignored because this level is not
in a hybrid list, as specified by **lstf\[0\].fHybrid**.

**lvlf.rgbxchNums:** An array that specifies the 1-based indexes of the
placeholders in **xst** (see the **xst** field of **LVL**). This array
has 9 elements, but is zero-terminated. The elements that follow the
first terminating zero are omitted for brevity.

**lvlf.rgbxchNums.xchNums\[0\]:** A value of 0x00 specifies that this
element and those that follow are ignored. Because this is the first
element in the array, this means that there are no placeholders in
**xst**, and therefore it is a static string.

**lvlf.ixchFollow:** A value of 0x01 specifies that a space immediately
follows the number text that is specified by **xst**.

**lvlf.dxaIndentSav:** A value of 0x00000000 is ignored because
**lvlf.fIndentSav** is zero.

**lvlf.unused2:** A value of 0x00000000 is ignored.

**lvlf.cbGrpprlChpx:** A value of 0x0D specifies that the size of
**grpprlPapx** is 13 bytes.

**lvlf.cbGrpprlPapx:** 0x10 specifies that the size of **grpprlChpx** is
16 bytes.

**lvlf.ilvlRestartLim:** A value of 0x00 is ignored because this level
does not have a number sequence.

**lvlf.grfhic:** This structure contains information that is only useful
for HTML compatibility. This example does not cover list HTML
compatibility.

**grpprlPapx:** Contains paragraph properties that are applied to the
paragraph after it receives number text. See Determining List
Formatting.

**grpprlChpx:** Contains character properties that are applied to the
number text. See Determining List Formatting.

**xst:** "Example:" specifies the number text of the level. As specified
by **lvlf.rgbxchNums**, this does not have any placeholders in it.
Therefore, this text is static and every paragraph in this level starts
with "Example: ".

The following table shows the expansion of the **PlfLfo** at offset
0x000007E1 in the Table Stream.

| **Offset** | **Size** | **Structure**                          | **Value**  |
|------------|----------|----------------------------------------|------------|
| 000007E1   | 0018     | PlfLfo **- PlfLfo**                    |            |
| 000007E1   | 0004     | ULONG **- lfoMac**                     | 0x00000001 |
| 000007E5   | 0010     | Array of LFO **- rgLfo**               |            |
| 000007E5   | 0010     | LFO **- lfo\[0\]**                     |            |
| 000007F5   | 0004     | Array of LFOData **- rgLfoData**       |            |
| 000007F5   | 0004     | [LFOData](#lfodata) **- lfoData\[0\]** |            |
| 000007F5   | 0004     | LONG **- cp**                          | 0xFFFFFFFF |
| 000007F9   | 0000     | Array of LFOLVL **- rgLfoLvl**         |            |

Figure 62: Expansion of PlfLfo

This contains the list format override information in the document.

**lfoMac:** A value of 0x00000001 specifies that **rgLfo** and
**rgLfoData** each have one element.

**rgLfo:** An array of LFO structures.

**rgLfo.lfo\[0\]:** An LFO structure that specifies a list format
override.

**rgLfoData:** An array of additional list format override data.

**rgLfoData.lfoData\[0\]:** An LFOData structure that specifies addition
list format override.

**rgLfoData.lfoData\[0\].cp:** A value of 0xFFFFFFFF is ignored.

**rgLfoData.lfoData\[0\].rgLfoLvl:** An empty array, because
**rgLfo.lfo\[0\].clfolvl** is zero.

The following table shows the expansion of **rgLfo.lfo\[0\]** in the
**PlfLfo** at offset 0x000007E1 in the Table Stream.

| **Offset** | **Size** | **Structure**             | **Value**  |
|------------|----------|---------------------------|------------|
| 000007E5   | 0010     | LFO **- lfo\[0\]**        |            |
| 000007E5   | 0004     | LONG **- lsid**           | 0x44F53D09 |
| 000007E9   | 0004     | LONG **- unused1**        | 0x00000000 |
| 000007ED   | 0004     | LONG **- unused2**        | 0x00000000 |
| 000007F1   | 0001     | BYTE **- clfolvl**        | 0x00       |
| 000007F2   | 0001     | BYTE **- ibstFltAutoNum** | 0x00       |
| 000007F3   | 0001     | grfhic **- grfhic**       |            |
| 000007F4   | 0001     | BYTE **- unused3**        | 0x00       |

Figure 63: Expansion of lfo\[0\]

This **LFO** is used as a level of indirection between the paragraphs in
a list and the **LSTF** that defines the list that they are in. An
**LFO**, along with its corresponding **LFOData**, can specify
information that overrides the formatting information specified by an
**LSTF** and its corresponding **LVL** structures. In this example, as
in most cases, there is no such overriding information specified.

**lsid:** A value of 0x44F53D09 specifies the value of the **lsid**
field of the **LSTF** that this **LFO** corresponds to. In this example,
this value is equal to **lstf\[0\].lsid** in the **PlfLst** at offset
0x00000536 in the Table Stream. Therefore, the list formatting of any
paragraph that uses this **LFO** is specified by **lstf\[0\]** in the
**PlfLst** at offset 0x00000536 in the Table Stream.

**unused1:** A value of 0x00000000 is ignored.

**unused2:** A value of 0x00000000 is ignored.

**clfolvl:** A value of 0x00 specifies that there are no
[**LFOLVL**](#lfolvl) structures in **rgLfoData.lfoData\[0\].rgLfoLvl**
in the **PlfLfo** at offset 0x000007E1 in the Table Stream.

**ibstFltAutoNum:** A value of 0x00 specifies that this **LFO** is not
used by any field.

**grfhic:** This structure contains information that is only useful for
HTML compatibility. This example does not cover list HTML compatibility.

**unused3:** 0x00 is ignored.
