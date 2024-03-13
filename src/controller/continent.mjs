export class ContinentController {
  constructor({ continent }) {
    this.continent = continent;
  }

  async getContinent(req, res) {
    const rs = await this.continent.get();
    res.json(rs);
  }

  async getOneContinent(req, res) {
    const { code } = req.params;
    const rs = await this.continent.getByCode(code);
    res.json(rs);
  }
}