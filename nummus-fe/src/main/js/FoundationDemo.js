import React, {Component} from 'react';


class FoundationDemo extends Component {
  render() {
    return (
        <div className="grid-container">
          <div className="grid-x grid-padding-x">
            <div className="large-12 cell">
              <h1>Welcome to Foundation</h1>
            </div>
          </div>

          <div className="grid-x grid-padding-x">
            <div className="large-12 cell">
            </div>
          </div>

          <div className="grid-x grid-padding-x">
            <div className="large-8 medium-8 cell">
              <h5>Here's your basic grid:</h5>

              <div className="grid-x grid-padding-x">
                <div className="large-12 cell">
                  <div className="primary callout">
                    <p><strong>This is a twelve cell section in a
                      grid-x.</strong> Each of these includes a div.callout
                      element so you can see where the cell are - it's not
                      required at all for the grid.</p>
                  </div>
                </div>
              </div>
              <div className="grid-x grid-padding-x">
                <div className="large-6 medium-6 cell">
                  <div className="primary callout">
                    <p>Six cell</p>
                  </div>
                </div>
                <div className="large-6 medium-6 cell">
                  <div className="primary callout">
                    <p>Six cell</p>
                  </div>
                </div>
              </div>
              <div className="grid-x grid-padding-x">
                <div className="large-4 medium-4 small-4 cell">
                  <div className="primary callout">
                    <p>Four cell</p>
                  </div>
                </div>
                <div className="large-4 medium-4 small-4 cell">
                  <div className="primary callout">
                    <p>Four cell</p>
                  </div>
                </div>
                <div className="large-4 medium-4 small-4 cell">
                  <div className="primary callout">
                    <p>Four cell</p>
                  </div>
                </div>
              </div>

              <hr/>

              <h5>We bet you&rsquo;ll need a form somewhere:</h5>
              <form>
                <div className="grid-x grid-padding-x">
                  <div className="large-12 cell">
                    <label>Input Label</label>
                    <input type="text" placeholder="large-12.cell"/>
                  </div>
                </div>
                <div className="grid-x grid-padding-x">
                  <div className="large-4 medium-4 cell">
                    <label>Input Label</label>
                    <input type="text" placeholder="large-4.cell"/>
                  </div>
                  <div className="large-4 medium-4 cell">
                    <label>Input Label</label>
                    <input type="text" placeholder="large-4.cell"/>
                  </div>
                  <div className="large-4 medium-4 cell">
                    <div className="grid-x">
                      <label>Input Label</label>
                      <div className="input-group">
                        <input type="text" placeholder="small-9.cell"
                               className="input-group-field"/>
                        <span className="input-group-label">.com</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid-x grid-padding-x">
                  <div className="large-12 cell">
                    <label>Select Box</label>
                    <select>
                      <option value="husker">Husker</option>
                      <option value="starbuck">Starbuck</option>
                      <option value="hotdog">Hot Dog</option>
                      <option value="apollo">Apollo</option>
                    </select>
                  </div>
                </div>
                <div className="grid-x grid-padding-x">
                  <div className="large-6 medium-6 cell">
                    <label>Choose Your Favorite</label>
                    <input type="radio" name="pokemon" value="Red"
                           id="pokemonRed" /><label htmlFor="pokemonRed">Radio
                      1</label>
                      <input type="radio" name="pokemon" value="Blue"
                             id="pokemonBlue" /><label htmlFor="pokemonBlue">Radio
                        2</label>
                  </div>
                  <div className="large-6 medium-6 cell">
                    <label>Check these out</label>
                    <input id="checkbox1" type="checkbox" /><label
                        htmlFor="checkbox1">Checkbox 1</label>
                      <input id="checkbox2" type="checkbox" /><label
                          htmlFor="checkbox2">Checkbox 2</label>
                  </div>
                </div>
                <div className="grid-x grid-padding-x">
                  <div className="large-12 cell">
                    <label>Textarea Label</label>
                    <textarea placeholder="small-12.cell"></textarea>
                  </div>
                </div>
              </form>
            </div>

            <div className="large-4 medium-4 cell">
              <h5>Try one of these buttons:</h5>
              <p><a href="#" className="button">Simple Button</a><br/>
                <a href="#" className="success button">Success Btn</a><br/>
                <a href="#" className="alert button">Alert Btn</a><br/>
                <a href="#" className="secondary button">Secondary Btn</a></p>
              <div className="callout">
                <h5>So many components, girl!</h5>
                <p>A whole kitchen sink of goodies comes with Foundation. Check
                  out the docs to see them all, along with details on making
                  them your own.</p>
                <a href="http://foundation.zurb.com/sites/docs/"
                   className="small button">Go to Foundation Docs</a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default FoundationDemo;
