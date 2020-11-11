import {
  trigger,
  animate,
  style, group,
  animateChild,
  query,
  stagger,
  transition,
  AnimationMetadata,
  sequence,
  state
} from '@angular/animations';

const ANIMATION_PARENT: AnimationMetadata[] = [
  query(':enter, :leave', style({ position: 'fixed', marginTop: '-12px', width: '100%' }), { optional: true }),
  query(':enter', style({ transform: 'translateX(0%)', opacity: 0 }), { optional: true }),
  sequence([
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('700ms ease-out',
          style({ transform: 'translateX(-55%)', opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(35%)', opacity: 0 }),
        animate('800ms ease-out',
          style({ transform: 'translateX(0%)', opacity: 1 })),
      ], { optional: true }),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ])
];



const ANIMATION_PARENT2: AnimationMetadata[] = [
  style({ position: 'relative' }),
  query(':enter, :leave', [ style({ position: 'absolute', top: -11, bottom: 0, width: '100%' })]),
  query(':enter', [ style({ bottom: '-50%', opacity: 0 }) ], { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(':leave', [ animate('700ms ease-in-out', style({ bottom: '50%', opacity: 0 })) ], { optional: true }),
    query(':enter', [ animate('800ms ease-in-out', style({ bottom: '0%', opacity: 1 })) ], { optional: true })
  ]),
  query(':enter', animateChild(), { optional: true }),
];


export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', ANIMATION_PARENT2)
]);

export const slideInAnimation2 =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);


export const animations = [
  trigger('tabAnimation', [
    state('show', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    state('hide', style({
      opacity: 0,
      transform: 'translateX(-15%)'
    })),
    transition('show => hide', animate('500ms ease-in-out')),
    transition('hide => show', animate('500ms 0ms ease-in-out'))
  ]),
  // trigger('scrollTitle', [
  //     state('show', style({
  //         opacity: 1,
  //         transform: 'translateX(0)'
  //     })),
  //     state('hide', style({
  //         opacity: 0,
  //         transform: 'translateY(-15%)'
  //     })),
  //     transition('show => hide', animate('700ms ease-out')),
  //     transition('hide => show', animate('1000ms 0ms ease-out'))
  // ]),
  // nice stagger effect when showing existing elements
  // trigger('list', [
  //     transition(':enter', [
  //         // child animation selector + stagger
  //         query('@items',
  //             stagger(300, animateChild())
  //         )
  //     ]),
  // ]),
  // trigger('items', [
  //     // cubic-bezier for a tiny bouncing feel
  //     transition(':enter', [
  //         style({ transform: 'scale(0.5)', opacity: 0 }),
  //         animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
  //             style({ transform: 'scale(1)', opacity: 1 }))
  //     ]),
  //     transition(':leave', [
  //         style({ transform: 'scale(1)', opacity: 1, height: '*' }),
  //         animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
  //             style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
  //     ]),
  // ])

  // export const homeTransition = trigger('homeTransition', [
  //     transition(':enter', [
  //         query('.block', style({ opacity: 0 }), { optional: true }),
  //         query('.block', stagger(300, [
  //             style({ transform: 'translateY(100px)' }),
  //             animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateY(0px)', opacity: 1 })),
  //         ]), { optional: true }),
  //     ]),
  //     transition(':leave', [
  //         query('.block', stagger(300, [
  //             style({ transform: 'translateY(0px)', opacity: 1 }),
  //             animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateY(100px)', opacity: 0 })),
  //         ]), { optional: true }),
  //     ])
  // ]);
];

