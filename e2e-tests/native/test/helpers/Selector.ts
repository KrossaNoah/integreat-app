export class Selector {
  private queries: string[] = new Array<string>()

  public ByText(text: string): Selector {
    if (driver.isAndroid) {
      this.queries.push(`.text("${text}")`)
    } else {
      this.queries.push(`label LIKE '${text}'`)
    }
    return this
  }

  public ByBeginsWith(text: string): Selector {
    if (driver.isAndroid) {
      this.queries.push(`.text("${text}")`)
    } else {
      this.queries.push(`label BEGINSWITH '${text}'`)
    }
    return this
  }

  public ByContainedText(text: string): Selector {
    if (driver.isAndroid) {
      this.queries.push(`.textContains("${text}")`)
    } else {
      this.queries.push(`label CONTAINS '${text}'`)
    }
    return this
  }

  public build(): string {
    if (driver.isAndroid) {
      return `android=new UiSelector()${this.queries.join('')}`
    }
    return `-ios predicate string:${this.queries.join(' AND ')}`
  }
}
