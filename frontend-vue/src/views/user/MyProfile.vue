
<script setup>

</script>




<template>
  <div>
    <section class="inner-section single-banner">
      <div class="container">
        <h2>my profile</h2>
      </div>
    </section>

    <section class="inner-section profile-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="account-card">
              <div class="account-title">
                <h4>Your Profile</h4>
                <button data-bs-toggle="modal" data-bs-target="#profile-edit">
                  edit profile
                </button>
              </div>
              <div class="account-content">
                <div class="row">
                  <div class="col-lg-2">
                    <div class="profile-image">
                      <a href="#"><img src="@/assets/images/user.png" alt="user" /></a>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4">
                    <div class="form-group">
                      <label class="form-label">name</label
                      ><input
                        class="form-control"
                        type="text"
                        value="Miron Mahmud"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4">
                    <div class="form-group">
                      <label class="form-label">Email</label
                      ><input
                        class="form-control"
                        type="email"
                        value="w3 Coders@gmail.com"
                      />
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="profile-btn">
                      <a href="change-password.html">change pass.</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="account-card">
              <div class="account-title">
                <h4>contact number</h4>
                <button data-bs-toggle="modal" data-bs-target="#contact-add">
                  add contact
                </button>
              </div>
              <div class="account-content">
                <div class="row">
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="profile-card contact active">
                      <h6>primary</h6>
                      <p>+8801838288389</p>
                      <ul>
                        <li>
                          <button
                            class="edit icofont-edit"
                            title="Edit This"
                            data-bs-toggle="modal"
                            data-bs-target="#contact-edit"
                          ></button>
                        </li>
                        <li>
                          <button
                            class="trash icofont-ui-delete"
                            title="Remove This"
                            data-bs-dismiss="alert"
                          ></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="profile-card contact">
                      <h6>secondary</h6>
                      <p>+8801941101915</p>
                      <ul>
                        <li>
                          <button
                            class="edit icofont-edit"
                            title="Edit This"
                            data-bs-toggle="modal"
                            data-bs-target="#contact-edit"
                          ></button>
                        </li>
                        <li>
                          <button
                            class="trash icofont-ui-delete"
                            title="Remove This"
                            data-bs-dismiss="alert"
                          ></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="profile-card contact">
                      <h6>secondary</h6>
                      <p>+8801747875727</p>
                      <ul>
                        <li>
                          <button
                            class="edit icofont-edit"
                            title="Edit This"
                            data-bs-toggle="modal"
                            data-bs-target="#contact-edit"
                          ></button>
                        </li>
                        <li>
                          <button
                            class="trash icofont-ui-delete"
                            title="Remove This"
                            data-bs-dismiss="alert"
                          ></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="account-card">
              <div class="account-title">
                <h4>delivery address</h4>
                <button data-bs-toggle="modal" data-bs-target="#address-add">
                  add address
                </button>
              </div>
              <div class="account-content">
                <div class="row">
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="profile-card address active">
                      <h6>Home</h6>
                      <p>
                        jalkuri, fatullah, narayanganj-1420. word no-09, road
                        no-17/A
                      </p>
                      <ul class="user-action">
                        <li>
                          <button
                            class="edit icofont-edit"
                            title="Edit This"
                            data-bs-toggle="modal"
                            data-bs-target="#address-edit"
                          ></button>
                        </li>
                        <li>
                          <button
                            class="trash icofont-ui-delete"
                            title="Remove This"
                            data-bs-dismiss="alert"
                          ></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="profile-card address">
                      <h6>Office</h6>
                      <p>
                        east tejturi bazar, dhaka-1200. word no-04, road
                        no-13/c, house no-4/b
                      </p>
                      <ul class="user-action">
                        <li>
                          <button
                            class="edit icofont-edit"
                            title="Edit This"
                            data-bs-toggle="modal"
                            data-bs-target="#address-edit"
                          ></button>
                        </li>
                        <li>
                          <button
                            class="trash icofont-ui-delete"
                            title="Remove This"
                            data-bs-dismiss="alert"
                          ></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="profile-card address">
                      <h6>Bussiness</h6>
                      <p>
                        kawran bazar, dhaka-1100. word no-02, road no-13/d,
                        house no-7/m
                      </p>
                      <ul class="user-action">
                        <li>
                          <button
                            class="edit icofont-edit"
                            title="Edit This"
                            data-bs-toggle="modal"
                            data-bs-target="#address-edit"
                          ></button>
                        </li>
                        <li>
                          <button
                            class="trash icofont-ui-delete"
                            title="Remove This"
                            data-bs-dismiss="alert"
                          ></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="account-card mb-0">
              <div class="account-title">
                <h4>payment option</h4>
                <button data-bs-toggle="modal" data-bs-target="#payment-add">
                  add card
                </button>
              </div>
              <div class="account-content">
                <div class="row">
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="payment-card payment active">
                      <img src="@/assets/images/payment/png/01.png" alt="payment" />
                      <h4>card number</h4>
                      <p>
                        <span>****</span><span>****</span><span>****</span
                        ><sup>1876</sup>
                      </p>
                      <h5>miron mahmud</h5>
                      <button
                        class="trash icofont-ui-delete"
                        title="Remove This"
                        data-bs-dismiss="alert"
                      ></button>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="payment-card payment">
                      <img src="@/assets/images/payment/png/02.png" alt="payment" />
                      <h4>card number</h4>
                      <p>
                        <span>****</span><span>****</span><span>****</span
                        ><sup>1876</sup>
                      </p>
                      <h5>miron mahmud</h5>
                      <button
                        class="trash icofont-ui-delete"
                        title="Remove This"
                        data-bs-dismiss="alert"
                      ></button>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-4 alert fade show">
                    <div class="payment-card payment">
                      <img src="@/assets/images/payment/png/03.png" alt="payment" />
                      <h4>card number</h4>
                      <p>
                        <span>****</span><span>****</span><span>****</span
                        ><sup>1876</sup>
                      </p>
                      <h5>miron mahmud</h5>
                      <button
                        class="trash icofont-ui-delete"
                        title="Remove This"
                        data-bs-dismiss="alert"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="modal fade" id="contact-add">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <button class="modal-close" data-bs-dismiss="modal">
            <i class="icofont-close"></i>
          </button>
          <form class="modal-form">
            <div class="form-title"><h3>add new contact</h3></div>
            <div class="form-group">
              <label class="form-label">title</label
              ><select class="form-select">
                <option selected>choose title</option>
                <option value="primary">primary</option>
                <option value="secondary">secondary</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">number</label
              ><input
                class="form-control"
                type="text"
                placeholder="Enter your number"
              />
            </div>
            <button class="form-btn" type="submit">save contact info</button>
          </form>
        </div>
      </div>
    </div>
    <div class="modal fade" id="address-add">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <button class="modal-close" data-bs-dismiss="modal">
            <i class="icofont-close"></i>
          </button>
          <form class="modal-form">
            <div class="form-title"><h3>add new address</h3></div>
            <div class="form-group">
              <label class="form-label">title</label
              ><select class="form-select">
                <option selected>choose title</option>
                <option value="home">home</option>
                <option value="office">office</option>
                <option value="Bussiness">Bussiness</option>
                <option value="academy">academy</option>
                <option value="others">others</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">address</label
              ><textarea
                class="form-control"
                placeholder="Enter your address"
              ></textarea>
            </div>
            <button class="form-btn" type="submit">save address info</button>
          </form>
        </div>
      </div>
    </div>
    <div class="modal fade" id="payment-add">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <button class="modal-close" data-bs-dismiss="modal">
            <i class="icofont-close"></i>
          </button>
          <form class="modal-form">
            <div class="form-title"><h3>add new payment</h3></div>
            <div class="form-group">
              <label class="form-label">card number</label
              ><input
                class="form-control"
                type="text"
                placeholder="Enter your card number"
              />
            </div>
            <button class="form-btn" type="submit">save card info</button>
          </form>
        </div>
      </div>
    </div>
    <div class="modal fade" id="profile-edit">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <button class="modal-close" data-bs-dismiss="modal">
            <i class="icofont-close"></i>
          </button>
          <form class="modal-form">
            <div class="form-title"><h3>edit profile info</h3></div>
            <div class="form-group">
              <label class="form-label">profile image</label
              ><input class="form-control" type="file" />
            </div>
            <div class="form-group">
              <label class="form-label">name</label
              ><input class="form-control" type="text" value="Miron Mahmud" />
            </div>
            <div class="form-group">
              <label class="form-label">email</label
              ><input
                class="form-control"
                type="text"
                value="w3 Coders@gmail.com"
              />
            </div>
            <button class="form-btn" type="submit">save profile info</button>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="contact-edit">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <button class="modal-close" data-bs-dismiss="modal">
            <i class="icofont-close"></i>
          </button>
          <form class="modal-form">
            <div class="form-title"><h3>edit contact info</h3></div>
            <div class="form-group">
              <label class="form-label">title</label
              ><select class="form-select">
                <option value="primary" selected>primary</option>
                <option value="secondary">secondary</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">number</label
              ><input class="form-control" type="text" value="+8801838288389" />
            </div>
            <button class="form-btn" type="submit">save contact info</button>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="address-edit">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <button class="modal-close" data-bs-dismiss="modal">
            <i class="icofont-close"></i>
          </button>
          <form class="modal-form">
            <div class="form-title"><h3>edit address info</h3></div>
            <div class="form-group">
              <label class="form-label">title</label
              ><select class="form-select">
                <option value="home" selected>home</option>
                <option value="office">office</option>
                <option value="Bussiness">Bussiness</option>
                <option value="academy">academy</option>
                <option value="others">others</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">address</label
              ><textarea
                class="form-control"
                placeholder="jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A"
              ></textarea>
            </div>
            <button class="form-btn" type="submit">save address info</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

