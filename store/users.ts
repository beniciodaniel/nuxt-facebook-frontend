import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios, $cookies } from '@/utils/nuxt-instance'
import { User } from '@/models'

@Module({ name: 'users', stateFactory: true, namespaced: true })
export default class Users extends VuexModule {
  // Estado de usuário:
  private user = {} as User
  // Getter de user:
  get $single() {
    return this.user
  }

  @Mutation
  UPDATE_USER(user: User) {
    this.user = user
  }

  // Mutation para atualizar em tempo real o avatar do user:
  @Mutation
  SET_USER_AVATAR(avatar: User['avatar']) {
    this.user.avatar = avatar
  }

  @Action
  public async show() {
    /* Se o user não tiver um cookie com o token apenas
    faz um return (ignora todo o código abaixo): */
    if (!$cookies.get('authToken')) return

    // Tive que colocar o dollar sign para pegar direito o objeto de user de dentro de data
    const user = await $axios.$get('/users')

    this.context.commit('UPDATE_USER', user)
  }

  @Action
  public async update(payload: any) {
    /* Se o user não tiver um cookie com o token apenas
    faz um return (ignora todo o código abaixo): */
    if (!$cookies.get('authToken')) return

    // Tive que colocar o dollar sign para pegar direito o objeto de user de dentro de data
    const user = await $axios.$put('/users', payload)

    this.context.commit('UPDATE_USER', user)
  }
}
