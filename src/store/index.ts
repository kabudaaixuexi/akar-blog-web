import moon from '@akar/proxy-property'
import user from './modules/user'
import cont from './modules/cont'

export default moon({
    ...user(),
    ...cont
}, {
    usePersisted: true
})
