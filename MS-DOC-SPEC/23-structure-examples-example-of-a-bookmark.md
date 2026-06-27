# Structure Examples

## Example of a Bookmark

The following is an example of a standard
[**bookmark**](#gt_42f9c2f4-8a4b-4d64-a0e1-fc071debdf4c). This structure
demonstrates the mapping between the name of a bookmark, the
[CP](#Section_a3d44e167d2946f7bb7bd0d8a5734f83) of the first character
of the bookmark, and the CP of the first character beyond the end of the
bookmark.

| **Offset** | **Size** | **Structure**                                 | **Value**  |
|------------|----------|-----------------------------------------------|------------|
| 0000009A   | 02E8     | [FibRgFcLcb97](#fibrgfclcb97) **- rgFcLcb97** |            |
| 0000009A   | 0108     | ... (omitted for brevity) **-**               |            |
| 00000142   | 0004     | **- fcSttbfBkmk**                             | 0x0000146B |
| 00000146   | 0004     | **- lcbSttbfBkmk**                            | 0x0000004E |
| 0000014A   | 0004     | **- fcPlcfBkf**                               | 0x000014B9 |
| 0000014E   | 0004     | **- lcbPlcfBkf**                              | 0x0000001C |
| 00000152   | 0004     | **- fcPlcfBkl**                               | 0x000014D5 |
| 00000156   | 0004     | **- lcbPlcfBkl**                              | 0x00000010 |
| 000001AA   | 01D8     | ... (omitted for brevity) **-**               |            |

Figure 15: Portions of the FibRgFcLcb97 structure, highlighting the
three fc/lcb pairs for standard bookmarks

As with all MS-DOC files, this file has a [**Fib**](#fib) structure at
offset zero in the [WordDocument
Stream](#Section_d7fae142670d4cd5869a708366984a71). The preceding table
shows a portion of the **FibRgFcLcb97** structure that is contained in
that **Fib**. The **FibRgFcLcb97** structure is very large. Most fields
have been omitted here, for brevity.

**fcSttbfBkmk:** 0x0000146B specifies the offset, in bytes, of a
location in the [Table
Stream](#Section_44f62054d9114989946ca42100c26a15). An
[**SttbfBkmk**](#sttbfbkmk) that contains the names of standard
bookmarks in the document begins at this offset.

**lcbSttbfBkmk:** 0x0000004E specifies the size, in bytes, of the
**SttbfBkmk** structure at offset 0x0000146B in the Table Stream.

**fcPlcfBkf:** 0x000014B9 specifies the offset, in bytes, of a location
in the Table Stream. A [**Plcfbkf**](#plcfbkf) structure that contains
information about standard bookmarks in the document begins at this
offset. This **Plcfbkf** structure is parallel to the **SttbfBkmk**
structure at offset **fcSttbfBkmk** in the Table Stream. Each data
element in the **Plcfbkf** structure specifies information about the
bookmark that is associated with the element which is located at the
same offset in that **SttbfBkmk** structure.

**lcbPlcfBkf:** 0x0000001C specifies the size, in bytes, of the
**Plcfbkf** structure at offset **fcPlcfBkf**.

**fcPlcfBkl:** 0x000014D5 specifies the offset, in bytes, of a location
in the Table Stream. A [**Plcfbkl**](#plcfbkl) structure that contains
information about standard bookmarks in the document begins at this
offset. Each data element in the **Plcfbkl** structure is associated in
a one-to-one correlation with a data element in the **Plcfbkf**
structure at offset **fcPlcfBkf**.

**lcbPlcfBkl:** 0x00000010 specifies the size, in bytes, of the
**Plcfbkl** structure at offset **fcPlcfBkl**.

The following table shows the expansion of the **SttbfBkmk** structure
at offset 0x0000146B in the Table Stream.

| **Offset** | **Size** | **Structure**               | **Value**   |
|------------|----------|-----------------------------|-------------|
| 0000146B   | 004E     | SttbfBkmk **- sttbfBkmk**   |             |
| 0000146B   | 0002     | USHORT **- fExtend**        | 0xFFFF      |
| 0000146D   | 0002     | USHORT **- cData**          | 0x0003      |
| 0000146F   | 0002     | USHORT **- cbExtra**        | 0x0000      |
| 00001471   | 0002     | USHORT **- cchString\[0\]** | 0x000B      |
| 00001473   | 0016     | **- string\[0\]**           | BookmarkThr |
| 00001489   | 0002     | USHORT **- cchString\[1\]** | 0x000B      |
| 0000148B   | 0016     | **- string\[1\]**           | BookmarkTwo |
| 000014A1   | 0002     | USHORT **- cchString\[2\]** | 0x000B      |
| 000014A3   | 0016     | **- string\[2\]**           | BookmarkOne |

Figure 16: The expansion of an SttbfBkmk

**fExtend:** 0xFFFF specifies that the **string** fields in this
**STTB** contain extended (2-byte) characters.

**cData:** 0x0003 specifies that this string table contains three
elements.

**cbExtra:** 0x0000 specifies that there is no extra data appended to
the **string** fields in this table.

**cchString\[0\]:** 0x000B specifies the count of characters in
**string\[0\]**.

**string\[0\]:** BookmarkThr specifies the name of a bookmark (1) in the
file.

**cchString\[1\]:** 0x000B specifies the count of characters in
**string\[1\]**.

**string\[1\]:** BookmarkTwo specifies the name of a bookmark (1) in the
file.

**cchString\[2\]:** 0x000B specifies the count of characters in
**string\[2\]**.

**string\[2\]:** BookmarkOne specifies the name of a bookmark (1) in the
file.

The following table shows the top-level expansion of the **Plcfbkf** at
offset 0x000014B9 in the Table Stream. Each CP in the **Plcfbkf**
specifies the location of the start of a bookmark in the document. Each
[**FBKF**](#fbkf) specifies further information about the bookmark
starting at the corresponding CP. The **FBKF** structures are expanded
in later figures.

| **Offset** | **Size** | **Structure**         | **Value**  |
|------------|----------|-----------------------|------------|
| 000014B9   | 001C     | Plcfbkf **- PlcfBkf** |            |
| 000014B9   | 0004     | LONG **- cp\[0\]**    | 0x00000000 |
| 000014BD   | 0004     | LONG **- cp\[1\]**    | 0x0000000D |
| 000014C1   | 0004     | LONG **- cp\[2\]**    | 0x00000011 |
| 000014C5   | 0004     | LONG **- cp\[3\]**    | 0x00000021 |
| 000014C9   | 0004     | FBKF **- fbkf\[0\]**  |            |
| 000014CD   | 0004     | FBKF **- fbkf\[1\]**  |            |
| 000014D1   | 0004     | FBKF **- fbkf\[2\]**  |            |

Figure 17: The top-level expansion of a Plcfbkf

**cp\[0\]:** 0x00000000 specifies the character position of the
beginning of the bookmark associated with **fbkf\[0\]**. The same
bookmark is associated with **string\[0\]** in the **SttbfBkmk** at
offset **fcSttbfBkmk** in the Table Stream, so its name is
"BookmarkThr".

**cp\[1\]:** 0x0000000D specifies the character position of the
beginning of the bookmark associated with **fbkf\[1\]**. The same
bookmark is associated with **string\[1\]** in the **SttbfBkmk** at
offset **fcSttbfBkmk** in the Table Stream, so its name is
"BookmarkTwo".

**cp\[2\]:** 0x00000011 specifies the character position of the
beginning of the bookmark associated with **fbkf\[2\]**. The same
bookmark is associated with **string\[2\]** in the SttbfBkmk at offset
**fcSttbfBkmk** in the Table Stream, so its name is "BookmarkOne".

**cp\[3\]:** 0x00000021 specifies the value one greater than the largest
value that a CP marking the start or end of a standard bookmark is
allowed to have, which is one beyond the character position of the end
of all [document parts](#Section_5f0c432987184d678cc760d8968c5127).

**fbkf\[0\]:** This value specifies further information about the
bookmark named "BookmarkThr", whose range begins at CP 0x00000000. This
structure is expanded in the following table.

**fbkf\[1\]:** This value specifies further information about the
bookmark named "BookmarkTwo", whose range begins at CP 0x0000000D. This
structure is expanded later.

**fbkf\[2\]:** This value specifies further information about the
bookmark named "BookmarkOne", whose range begins at CP 0x00000011. This
structure is expanded later.

The following table shows the expansion of **fbkf\[0\]** in the
**Plcfbkf** structure at offset 0x000014B9 in the Table Stream.

| **Offset** | **Size** | **Structure**         | **Value** |
|------------|----------|-----------------------|-----------|
| 000014C9   | 0004     | FBKF **- fbkf**       |           |
| 000014C9   | 0002     | USHORT **- ibkl**     | 0x0002    |
| 000014CB   | 0002     | [BKC](#bkc) **- bkc** |           |
| 000014CB   | 0002     | USHORT **- itcFirst** | 0x0000    |
| 000014CD   | 0002     | USHORT **- fPub**     | 0x0000    |
| 000014CF   | 0002     | USHORT **- itcLim**   | 0x0000    |
| 000014D1   | 0002     | USHORT **- fNative**  | 0x0000    |
| 000014D3   | 0002     | USHORT **- fCol**     | 0x0000    |

Figure 18: Expansion of fbkf\[0\]

**ibkl:** A value of 0x0002 specifies a zero-based index into the
**Plcfbkl** structure at offset 0x000014D5 in the Table Stream. The
entry found at said index specifies the location of the end of the
bookmark named "BookmarkThr".

**bkc.itcFirst:** A value of 0x0000 is ignored, because the value of the
**fCol** value that belongs to this **BKC** structure is 0.

**bkc.fPub:** A value of 0x0000 is ignored.

**bkc.itcLim:** A value of 0x0000 is ignored, because the value of the
**fCol** value that belongs to this **BKC** structure is 0.

**bkc.fNative:** 0x0000 specifies that an application is expected to
include the bookmark named "BookmarkThr" when saving its file as RTF
([**Rich text**](#gt_b07b9fa4-0a06-4db3-85ca-3157048ef9da) Format),
HTML, or XML.

**bkc.fCol:** This value is 0x0000 because some of the text that is
spanned by the bookmark named "BookmarkThr" is not inside a table, so
the lowest table nesting depth within the span of text that is defined
by its character positions is 0.

The following table shows the expansion of **fbkf\[1\]** in the
**Plcfbkf** structure at offset 0x000014B9 in the Table Stream.

| **Offset** | **Size** | **Structure**         | **Value** |
|------------|----------|-----------------------|-----------|
| 000014CD   | 0004     | FBKF **- fbkf**       |           |
| 000014CD   | 0002     | USHORT **- ibkl**     | 0x0000    |
| 000014CF   | 0002     | BKC **- bkc**         |           |
| 000014CF   | 0002     | USHORT **- itcFirst** | 0x0001    |
| 000014D1   | 0002     | USHORT **- fPub**     | 0x0000    |
| 000014D3   | 0002     | USHORT **- itcLim**   | 0x0002    |
| 000014D5   | 0002     | USHORT **- fNative**  | 0x0000    |
| 000014D7   | 0002     | USHORT **- fCol**     | 0x0001    |

Figure 19: Expansion of fbkf\[1\]

**ibkl:** 0x0000 specifies a zero-based index into the **Plcfbkl**
structure at offset 0x000014D5 in the Table Stream. The entry found at
the index specifies the location of the end of the bookmark named
"BookmarkTwo".

**bkc.itcFirst:** A value of 0x0001 specifies the zero-based index of
the table column that is the start of the table column range associated
with the bookmark named "BookmarkTwo".

**bkc.fPub:** A value of 0x0000 is ignored.

**bkc.itcLim:** A value of 0x0002 specifies that the zero-based index of
the first column beyond the end of the table column range associated
with the bookmark named "BookmarkTwo".

**bkc.fNative:** A value of 0x0000 specifies that an application is
expected to include the bookmark named "BookmarkTwo" when saving its
file as RTF (Rich text Format), HTML, or XML.

**bkc.fCol:** This value is 0x0001 because both of the following
conditions hold:

- All of the text that is spanned by the bookmark named "BookmarkTwo" is
  inside a table, so the lowest table nesting depth within the span of
  text that is defined by its character positions is greater than 0.

- The span of text that is defined by the character positions of that
  bookmark contains a table cell mark from that table and nothing
  outside that table.

The following table shows the expansion of **fbkf\[2\]** in the
**Plcfbkf** structure at offset 0x000014B9 in the Table Stream.

| **Offset** | **Size** | **Structure**         | **Value** |
|------------|----------|-----------------------|-----------|
| 000014D1   | 0004     | FBKF **- fbkf**       |           |
| 000014D1   | 0002     | USHORT **- ibkl**     | 0x0001    |
| 000014D3   | 0002     | BKC **- bkc**         |           |
| 000014D3   | 0002     | USHORT **- itcFirst** | 0x0000    |
| 000014D5   | 0002     | USHORT **- fPub**     | 0x0000    |
| 000014D7   | 0002     | USHORT **- itcLim**   | 0x0000    |
| 000014D9   | 0002     | USHORT **- fNative**  | 0x0000    |
| 000014DB   | 0002     | USHORT **- fCol**     | 0x0000    |

Figure 20: Expansion of fbkf\[2\]

**ibkl:** A value of 0x0001 specifies a zero-based index into the
**Plcfbkl** structure at offset 0x000014D5 in the Table Stream. The
entry found at the index specifies the location of the end of the
bookmark named "BookmarkOne".

**bkc.itcFirst:** A value of 0x0000 is ignored, because the value of the
**fCol** that belongs to this **BKC** is 0.

**bkc.fPub:** A value of 0x0000 is ignored.

**bkc.itcLim:** A value of 0x0000 is ignored, because the value of the
**fCol** that belongs to this **BKC** is 0.

**bkc.fNative:** A value of 0x0000 specifies that an application is
expected to include the bookmark named "BookmarkOne" when saving its
file as RTF (Rich text Format), HTML, or XML.

**bkc.fCol:** This value is 0x0000 because some of the text spanned by
the bookmark named "BookmarkOne" is not inside a table, so the lowest
table nesting depth within the span of text defined by its character
positions is 0.

The following table shows the top-level expansion of the **Plcfbkl**
structure at offset 0x000014D5 in the Table Stream. Each CP in the
**Plcfbkl** structure specifies the location of the end of a bookmark
(1) in the document.

| **Offset** | **Size** | **Structure**         | **Value**  |
|------------|----------|-----------------------|------------|
| 000014D5   | 0010     | Plcfbkl **- plcfBkl** |            |
| 000014D5   | 0004     | LONG **- cp\[0\]**    | 0x00000016 |
| 000014D9   | 0004     | LONG **- cp\[1\]**    | 0x0000001B |
| 000014DD   | 0004     | LONG **- cp\[2\]**    | 0x0000001E |
| 000014E1   | 0004     | LONG **- cp\[3\]**    | 0x00000021 |

Figure 21: The expansion of a Plcfbkl

**cp\[0\]:** A value of 0x00000016 specifies the character position that
is 1 beyond the end of the bookmark associated with **fbkf\[1\]** in the
**Plcfbkf** structure at offset **fcPlcfBkf** in the Table Stream, whose
name is "BookmarkTwo". This CP is known to be associated with
**fbkf\[1\]** because **fbkf\[1\].ibkl** is 0.

**cp\[1\]:** A value of 0x0000001B specifies the character position that
is 1 beyond the end of the bookmark associated with **fbkf\[2\]** in the
**Plcfbkf** structure at offset **fcPlcfBkf** in the Table Stream, whose
name is "BookmarkOne". This CP is known to be associated with
**fbkf\[2\]** because **fbkf\[2\].ibkl** is 1.

**cp\[2\]:** A value of 0x0000001E specifies the character position that
is 1 beyond the end of the bookmark associated with **fbkf\[0\]** in the
**Plcfbkf** structure at offset **fcPlcfBkf** in the Table Stream, whose
name is "BookmarkThr". This CP is known to be associated with
**fbkf\[0\]** because **fbkf\[0\].ibkl** is 2.

**cp\[3\]:** A value of 0x00000021 specifies a value that is 1 greater
than the largest value that a CP marking the start or end of a standard
bookmark is allowed to have, which is 1 beyond the character position of
the end of all document parts.
