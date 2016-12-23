import React from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as deps from '../../deps';

let MenuEntry = ({ niceName, name, selectedSiteId, selectedService, selectedPackageName }) => (
  <li className={selectedPackageName === name && 'is-active'}>
    <Link
      to={`/site/${selectedSiteId}/${selectedService}/${name}`}
      role="button" activeClassName="is-active"
    >
      {niceName}
    </Link>
  </li>
);
MenuEntry.propTypes = {
  niceName: React.PropTypes.string,
  name: React.PropTypes.string,
  selectedSiteId: React.PropTypes.string.isRequired,
  selectedService: React.PropTypes.string.isRequired,
  selectedPackageName: React.PropTypes.string.isRequired,
};

const mapStateToMenuEntryProps = (state) => ({
  selectedSiteId: deps.selectors.getSelectedSiteId(state),
  selectedService: deps.selectors.getSelectedService(state),
  selectedPackageName: deps.selectors.getSelectedPackageName(state),
});

MenuEntry = connect(mapStateToMenuEntryProps)(MenuEntry);

export const MenuCategory = ({ name, entries }) => (
  <div>
    <p className="menu-label">
      {name}
    </p>
    <ul className="menu-list">
      {entries.map(entry =>
        (<MenuEntry key={entry.name} name={entry.name} niceName={entry.menu.niceName} />)
      )}
    </ul>
  </div>
);

MenuCategory.propTypes = {
  name: React.PropTypes.string,
  entries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

const AsideMenu = ({ settings }) => (
  <div className="column is-hidden-mobile is-2">
    <aside className="menu">
      {
        map(settings, (entries, name) =>
          <MenuCategory key={name} name={name} entries={entries} />
        )
      }
    </aside>
  </div>
);

AsideMenu.propTypes = {
  settings: React.PropTypes.objectOf(React.PropTypes.array).isRequired,
};

const mapStateToMenuProps = (state) => ({
  settings: deps.selectors.getCategories(state),
});

export default connect(mapStateToMenuProps)(AsideMenu);