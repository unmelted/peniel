

export const MENUITEMS = [
  {
    menutitle: 'ROBOT',
  },
      {
        icon: (<i className="side-menu__icon bx bx-directions"></i>),
        type: 'sub',
        Name: 'ABCDE',
        active: true,
        selected: true,
        title: 'STARK SYSTEM',
        badge: '',
        badgetxt: '',
        class: 'badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-2',
        children: [
          { path: `${import.meta.env.BASE_URL}dashboards/stark`, type: 'link', active: false, selected: false, title: 'IMS' }
        ]
      },
];
