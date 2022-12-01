import PaginationProvider from "@Utils/PaginationProvider";

describe("Util:PaginatorProvider", () => {
  it("Check default values", () => {
    const paginator = new PaginationProvider("", "");

    expect(paginator.limit).toBe(10);
    expect(paginator.offset).toBe(0);
    expect(paginator.page).toBe(1);
  });

  it("Can set total value", () => {
    const paginator = new PaginationProvider("", "");
    paginator.setTotal(100);

    expect(paginator.total).toBe(100);
  });

  it("Check maximum value and minimum page", () => {
    const paginator = new PaginationProvider(-1, 5000000);

    expect(paginator.limit).toBe(1000);
    expect(paginator.offset).toBe(0);
    expect(paginator.page).toBe(1);
  });

  it("Can handle NaN inputs", () => {
    const paginator = new PaginationProvider("abcd", "efg");

    expect(paginator.limit).toBe(10);
    expect(paginator.offset).toBe(10);
    expect(paginator.page).toBe(1);
  });

  it("Offset calculation check", () => {
    const paginator = new PaginationProvider(5, 50);

    expect(paginator.offset).toBe(200);
  });

  it("Paginated response", () => {
    const paginator = new PaginationProvider(5, 50);
    const response = paginator.toResponse([], 100);

    expect(response).toMatchObject({
      limit: 50,
      page: 5,
      total: 100,
      data: []
    });
  });

  it("can create from query", () => {
    const paginator = PaginationProvider.fromQuery({
      page: "abc",
      limit: "def"
    });

    expect(paginator.limit).toBe(10);
    expect(paginator.offset).toBe(0);
    expect(paginator.page).toBe(1);
  });
});
